import Stream from "stream";

const DEBUG = process.env['NODEJS_OBJECT_STREAM_TRACE'] !== ''

/** @type {(s: string) => void} */
const log = m => DEBUG ? console.log(m) : undefined;

let chainCount = 0
let composeCount = 0
let neverCount = 0
let onceCount = 0
let bindCount = 0
let zipCount = 0
let mapCount = 0
let constCount = 0
let fromPromiseCount = 0

export class Never extends Stream.Readable {
  constructor() {
    super({objectMode: true})
    this.id = neverCount++
  }

  _read() {
    log(`Never {id: ${this.id}}#_read()`)
    log(`  this.push(null)`)
    this.push(null)
  }
}

/** @template T */
export class Once extends Stream.Duplex {
  /** @param {T} a */
  constructor(a) {
    super({objectMode: true, allowHalfOpen: false})
    this.a = a
    this.id = onceCount++
    this.push(this.a)
    this.push(null)
    log(`Once {id: ${this.id}}#new()`)
    log(`  this.push(${a})`)
    log(`  this.push(null)`)
  }

  /** @type {Stream.Duplex['_write']} */
  _write(_ck, _enc, cb) {
    cb()
  }

  _read() {
    log(`Once {id: ${this.id}}#_read()`)
  }
}

/** @template T */
export class Const extends Stream.Transform {
  /** @param {T} a */
  constructor(a) {
    super({objectMode: true})
    this.a = a
    this.id = constCount++
  }

  /** @type {Stream.Transform['_transform']} */
  _transform(_c, _enc, cb) {
    log(`Const {id: ${this.id}}#_transform(${_c}, _, _)`)
    log(`  cb(${this.a})`)
    this.push(this.a)
    cb()
  }
}

/** @template T */
export class FromPromise extends Stream.Readable {
  /** @param {Promise<T>} p */
  constructor(p) {
    super({objectMode: true})
    this.id = fromPromiseCount++
    p
       .then(a => {
         log(`FromPromise {id: ${this.id}}#new()`)
         log(`  ...p.then(...)`)
         log(`    this.push(${a})`)
         log(`    this.push(null)`)
         this.push(a)
         this.push(null)
       })
       .catch(e => {
         log(`FromPromise {id: ${this.id}}#new()`)
         log(`  ...p.catch(...)`)
         log(`    this.destroy(${e})`)
         this.destroy(e)
       })
  }

  _read() {
    log(`FromPromise {id: ${this.id}}#_read()`)
  }
}

/** @template T */
export class Chain extends Stream.Readable {
  /** @param {...Stream.Readable} streams */
  constructor(...streams) {
    super({objectMode: true})
    this.id = chainCount++
    this.ix = -1
    this.streams = streams
    this.next()
  }

  next() {
    log(`Chain {id: ${this.id}}#next()`)
    this.ix++
    if (this.ix === this.streams.length) {
      log(`  this.push(null)`)
      this.push(null)
    } else {
      const cur = this.streams[this.ix]

      cur.once('error', e => {
        log(`Chain {id: ${this.id}}#next()`)
        log(`  cur.once('error', ...)`)
        log(`    this.destroy(${e})`)
        this.destroy(e)
      })

      cur.once('end', () => {
        log(`Chain {id: ${this.id}}#next()`)
        log(`  cur.once('end', ...)`)
        log(`    this.next()`)
        this.next()
      })

      cur.on('data', ck => {
        log(`Chain {id: ${this.id}}#next()`)
        log(`  cur.on('data', ...)`)
        log(`    this.push(${ck})`)
        const canPush = this.push(ck)
        if (cur && !canPush) {
          log(`    cur.pause()`)
          cur.pause()
        }
      })
    }
  }

  _read() {
    log(`Chain {id: ${this.id}}#_read()`)
    this.streams.forEach(s => {
      if (s.isPaused()) {
        log(`  s.resume()`)
        s.resume()
      }
    })
  }
}

/**
  * @template T
  * @template R
  */
export class Map extends Stream.Transform {
  /** @param {(t: T) => R} f */
  constructor(f) {
    super({objectMode: true})
    this.f = f
    this.id = mapCount++
  }

  /** @type {Stream.Transform['_transform']} */
  _transform(ck, _, cb) {
    log(`Map {id: ${this.id}}#_transform(${ck}, _, _)`)
    const r = this.f(ck)
    log(`  const r = (${r})`)
    log(`  cb(null, ${r})`)
    cb(null, r)
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
    this.id = zipCount++
    log(`Zip {id: ${this.id}}#new()`)
    log(`  this.streams = Array {streams: ${streams.length}}`)
    this.streams = streams
    this.streams.forEach((s, ix) => {
      log(`  this.streams[${ix}].once('error', ...)`)
      log(`  this.streams[${ix}].once('end', ...)`)
      log(`  this.streams[${ix}].once('data', ...)`)
      s.once('error', e => this.destroy(e))
      s.once('end', () => this.push(null))
      s.on('data', ck => {
        log(`Zip {id: ${this.id}}#new()`)
        log(`  this.streams[${ix}].once('data', ...)`)
        log(`    this.bufput(${ix}, ${ck})`)
        log(`    stream.pause()`)
        this.bufput(ix, ck)
        s.pause()
      })
    })
  }

  /** @type {(ix: number, val: unknown) => boolean} */
  bufput(ix, val) {
    log(`Zip {id: ${this.id}}#bufput(${ix}, ${val})`)
    const bufstr = JSON.stringify(this.buf.map(a => a === null ? 'null' : '..'))
    log(`  this.buf = ${bufstr}`)
    this.buf[ix] = val
    if (!this.isWaiting()) {
      log(`  this.push(${bufstr})`)
      const canPush = this.push(this.buf)
      this.bufinit()
      if (canPush) {
        log(`  this.streams.forEach(s => s.resume())`)
        this.streams.forEach(s => s.resume())
      }
      return canPush
    } else {
      return true
    }
  }

  bufinit() {
    const nuls = this.streams.map(() => null)
    log(`  this.buf = ${JSON.stringify(nuls)}`)
    this.buf = nuls
  }

  isWaiting() {
    return this.buf.some(a => a === null)
  }

  _read() {
    log(`Zip {id: ${this.id}}#_read()`)
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
    this.id = composeCount++

    this.a = a
    this.b = b

    log(`Compose {id: ${this.id}}#new()`)
    log(`  a.on('data', ...)`)
    log(`  a.once('end', ...)`)
    log(`  a.once('error', ...)`)
    log(`  a.pause()`)
    log(`  b.on('drain', ...)`)
    log(`  b.on('data', ...)`)
    log(`  b.on('error', ...)`)
    log(`  b.on('finish', ...)`)

    this.a.once('end', () => {
      log(`Compose {id: ${this.id}}#new()`)
      log(`  a.on('end', ...)`)
      log(`    b.end()`)
      this.b.end()
    })

    this.a.on('data', ck => {
      log(`Compose {id: ${this.id}}#new()`)
      log(`  a.on('data', ...)`)
      log(`    b.write(${ck})`)
      const canWrite = this.b.write(ck)

      if (!canWrite) {
        log(`    a.pause()`)
        this.a.pause()
      }
    })

    this.a.once('error', e => {
      log(`Compose {id: ${this.id}}#new()`)
      log(`  a.once('error', ...)`)
      log(`    this.destroy(${e})`)
      this.destroy(e)
      this.b.destroy(e)
    })

    this.b.on('drain', () => {
      log(`Compose {id: ${this.id}}#new()`)
      log(`  b.on('drain', ...)`)
      log(`    this.a.resume()`)
      this.a.resume()
    })

    this.b.on('data', ck => {
      log(`Compose {id: ${this.id}}#new()`)
      log(`  b.on('data', ...)`)
      log(`    this.push(${ck})`)
      const canPush = this.push(ck)
      if (!canPush) {
        log(`    b.pause()`)
        this.b.pause()
      }
    })

    this.b.once('error', e => {
      log(`Compose {id: ${this.id}}#new()`)
      log(`  b.once('error', ...)`)
      log(`    this.destroy(${e})`)
      this.destroy(e)
      this.a.destroy(e)
    })

    this.b.once('finish', () => {
      log(`Compose {id: ${this.id}}#new()`)
      log(`  b.once('finish', ...)`)
      log(`    this.emit('finish')`)
      this.push(null)
      this.end()
      this.emit('finish')
    })
  }

  _read() {
    log(`Compose {id: ${this.id}}#_read()`)
    if (this.b.isPaused()) {
      log(`  b.resume()`)
      this.b.resume()
    }
  }

  /** @type {Stream.Duplex['_write']} */
  _write(ck, _enc, cb) {
    log(`Compose {id: ${this.id}}#_write(${ck}, _, _)`)
    if (this.a instanceof Stream.Readable) {
      throw new Error('Cannot `write` to a Readable stream')
    }

    log(`  this.a.write(${ck}, _, _)`)
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
    super({objectMode: true, allowHalfOpen: true})
    this.f = f
    this.id = bindCount++

    this.ix = 0

    /** @type {Array<Stream.Readable>} */
    this.streams = []

    /** @type {(() => void) | undefined} */
    this.doneCb = undefined

    this.paused = true
  }

  /** @type {NonNullable<Stream.Duplex['_final']>} */
  _final(cb) {
    log(`Bind {id: ${this.id}}#_final(_)`)
    this.doneCb = cb
  }

  init() {
    log(`Bind {id: ${this.id}}#init()`)

    const s = this.streams[this.ix]
    if (this.paused || (!s && !this.doneCb)) {
      this.paused = true
      return
    } else if (this.doneCb) {
      log(`  this.doneCb()`)
      this.doneCb()
      this.doneCb = undefined
      return
    }

    log(`  s.on('data', ...)`)
    s.on('data', ck => {
      log(`Bind {id: ${this.id}}#initcur()`)
      log(`  s.on('data', ...)`)
      log(`    this.push(${ck})`)
      const canPush = this.push(ck)
      if (!canPush) {
        s.pause()
      }
    })

    log(`  s.once('end', ...)`)
    s.once('end', () => {
      log(`Bind {id: ${this.id}}#initcur()`)
      log(`  s.once('end', ...)`)
      log(`    this.ix++`)
      log(`    this.init()`)
      this.ix++
      this.init()
    })
  }

  /** @type {Stream.Duplex['_write']} */
  _write(ck, _, cb) {
    log(`Bind {id: ${this.id}}#_write(${ck}, _, _)`)
    try {
      log(`  this.streams = ${JSON.stringify(this.streams.map(_ => 'Readable'))}`)
      this.streams.push(this.f(ck)())
      if (this.paused) {
        log(`  this.init()`)
        this.paused = false
        this.init()
      }
      log(`  cb()`)
      cb()
    } catch(e) {
      log(`  cb(${e})`)
      // @ts-ignore
      cb(e)
    }
  }

  /** @type {Stream.Duplex['_read']} */
  _read() {
    log(`Bind {id: ${this.id}}#_read()`)
    this.streams.forEach(s => 
    s.isPaused() ? s.resume() : undefined)
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
