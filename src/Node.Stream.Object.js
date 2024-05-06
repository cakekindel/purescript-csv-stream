import Stream from "stream";

export class Never extends Stream.Readable {
  constructor() {
    super({read: function() {
      this.push(null)
    }, objectMode: true})
  }
}

/** @template T */
export class Once extends Stream.Readable {
  /** @param {T} a */
  constructor(a) {
    super({read: function() { }, objectMode: true})
    this.push(a)
    this.push(null)
  }
}

/** @template T */
export class Const extends Stream.Transform {
  /** @param {T} a */
  constructor(a) {
    super({transform: function(_c, _enc, cb) {
      cb(null, a)
    }, objectMode: true})
  }
}

/** @template T */
export class FromPromise extends Stream.Readable {
  /** @param {Promise<T>} p */
  constructor(p) {
      p
        .then(a => {
          this.push(a)
          this.push(null)
        })
        .catch(e => {
          this.destroy(e)
        })

    super({read: function() {}, objectMode: true})
  }
}

/** @template T */
export class Chain extends Stream.Readable {
  /** @param {...Stream.Readable} streams */
  constructor(...streams) {
    super({objectMode: true})
    this.ix = -1
    this.streams = streams
    /** @type {Stream.Readable | undefined} */
    this.cur = undefined
    this.next()
  }

  next() {
    this.ix++
    if (this.ix === this.streams.length) {
      return undefined
    } else {
      this.cur = this.streams[this.ix]

      this.cur.once('end', () => {
        this.next()
      })

      this.cur.on('data', ck => {
        const canPush = this.push(ck)
        if (this.cur && !canPush) {
          this.cur.pause()
        }
      })
    }
  }

  _read() {
    if (!this.cur) {
      this.push(null)
    } else if (this.cur.isPaused()) {
      this.cur.resume()
    }
  }
}

/**
  * @template T
  * @template R
  */
export class Map extends Stream.Transform {
  /** @param {(t: T) => R} f */
  constructor(f) {
    super({
    transform: function (chunk, _, cb) {
      try {
        this.push(f(chunk))
        cb();
      } catch (e) {
        // @ts-ignore
        cb(e);
      }
    },
    objectMode: true
  })
  }
}

export class Zip extends Stream.Readable {
  /** @type {Array<Stream.Readable>} */
  streams = []

  /** @type {Array<unknown | null>} */
  buf = []

  /** @param {...Stream.Readable} streams */
  constructor(...streams) {
    super({objectMode: true})
    this.streams = streams
    this.streams.forEach((s, ix) => {
      s.once('error', e => this.destroy(e))
      s.once('end', () => this.push(null))
      s.on('data', ck => {
        const canPush = this.bufput(ix, ck)
        if (!canPush) {
          this.streams.forEach(s => s.pause())
        }
      })
    })
  }

  /** @type {(ix: number, val: unknown) => boolean} */
  bufput(ix, val) {
    this.buf[ix] = val
    if (!this.isWaiting()) {
      const canPush = this.push(this.buf)
      this.bufinit()
      return canPush
    } else {
      return true
    }
  }

  bufinit() {
    this.buf = this.streams.map(() => null)
  }

  isWaiting() {
    return this.buf.some(a => a === null)
  }

  _read() {
    this.streams.forEach(s => {
      if (s.isPaused()) {
        s.resume()
      }
    })
  }
}

export class Compose extends Stream.Duplex {
  /**
   * @param {Stream.Readable | Stream.Transform} a
   * @param {Stream.Transform} b
   */
  constructor(a, b) {
    super({objectMode: true})
    this.a = a
    this.b = b

    this.a.on('data', ck => {
      const canWrite = this.b.write(ck)
      if (!canWrite) {
        this.a.pause()
      }
    })
    this.a.once('error', e => this.destroy(e))
    this.a.once('end', () => this.push(null))

    this.b.on('drain', () => {
      if (this.a.isPaused()) {
        this.a.resume()
      }
    })
    this.b.on('data', ck => {
      const canPush = this.push(ck)
      if (!canPush) {
        this.a.pause()
        this.b.pause()
      }
    })
    this.b.once('error', e => this.destroy(e))
    this.b.once('end', () => this.emit('end'))
    this.b.once('finish', () => this.emit('finish'))
  }

  _read() {
    if (this.a.isPaused()) {
      this.a.resume()
    }

    if (this.b.isPaused()) {
      this.b.resume()
    }
  }

  /** @type {Stream.Duplex['_write']} */
  _write(ck, _enc, cb) {
    if (this.a instanceof Stream.Readable) {
      throw new Error('Cannot `write` to a Readable stream')
    }

    this.a.write(ck, _enc, cb)
  }
}

/**
 * @template T 
 */
export class Bind extends Stream.Duplex {
  /**
   * @param {(t: T) => () => Stream.Readable} f
   */
  constructor(f) {
    super({objectMode: true})
    this.f = f

    /** @type {Stream.Readable | undefined } */
    this.cur = undefined

    /** @type {Array<Stream.Readable>} */
    this.streams = []
  }

  initcur() {
    if (!this.cur) {
      this.cur = this.streams[0]
    }

    this.cur.on('data', ck => {
      const canPush = this.push(ck)
      if (!canPush && this.cur) {
        this.cur.pause()
      }
    })

    this.cur.on('end', () => {
      this.streams.shift()
      if (this.streams.length > 0) {
        this.cur = this.streams[0]
        this.initcur()
      } else {
        this.cur = undefined
      }
    })
  }

  /** @type {Stream.Duplex['_write']} */
  _write(ck, _, cb) {
    try {
      this.streams.push(this.f(ck)())
      this.initcur()
      cb()
    } catch(e) {
      // @ts-ignore
      cb(e)
    }
  }

  /** @type {Stream.Duplex['_read']} */
  _read() {
    if (this.cur && this.cur.isPaused()) {
      this.cur.resume()
    }
  }
}

/** @type {() => Stream.Readable} */
export const neverImpl = () => new Never();

/** @type {<T>(a: T) => () => Stream.Transform} */
export const constImpl = (a) => () => new Const(a);

/** @type {<T>(a: T) => () => Stream.Readable} */
export const onceImpl = (a) => () => new Once(a);

/** @type {<T>(a: () => Promise<T>) => () => Stream.Readable} */
export const fromPromiseImpl = (a) => () => new FromPromise(a())

/** @type {(ss: Array<Stream.Readable>) => () => Stream.Readable} */
export const chainImpl = (ss) => () => new Chain(...ss);

/** @type {<T, R>(f: (t: T) => R) => () => Stream.Transform} */
export const mapImpl = (f) => () => new Map(f);

/** @type {(iab: Stream.Readable) => (ia: Stream.Readable) => () => Stream.Readable} */
export const applyImpl = (iab) => (ia) => () =>
  new Compose(new Zip(iab, ia), new Map(([ab, a]) => ab(a)))

/** @type {<T>(f: (t: T) => () => Stream.Readable) => () => Stream.Duplex} */
export const bindImpl = (f) => () => new Bind(f)

/** @type {(a: Stream.Transform | Stream.Readable) => (b: Stream.Transform) => () => Stream.Duplex} */
export const pipeImpl = (a) => (b) => () => new Compose(a, b)

process.on('beforeExit', () => {
  debugger;
})
