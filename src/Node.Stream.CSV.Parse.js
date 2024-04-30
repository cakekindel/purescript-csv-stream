import {parse} from 'csv-parse'

/** @type {(s: import('csv-parse').Options) => () => import('csv-parse').Parser} */
export const makeImpl = c => () => parse(c)

/** @type {(s: import('stream').Duplex) => () => string[] | null} */
export const readImpl = s => () => s.read();
