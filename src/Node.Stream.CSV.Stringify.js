import { stringify } from "csv-stringify";

/** @type {(c: import('csv-stringify').Options) => () => import('csv-stringify').Stringifier} */
export const makeImpl = (c) => () => stringify(c);

/** @type {(s: import('csv-stringify').Stringifier) => (vals: Array<string>) => () => void} */
export const writeImpl = (s) => (vals) => () => s.write(vals);
