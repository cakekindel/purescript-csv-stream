import { Parser } from "csv-parse";

/** @type {(s: import('csv-parse').Options) => () => Parser} */
export const makeImpl = (c) => () => new Parser(c);

/** @type {(s: Parser) => () => Array<string> | null} */
export const readImpl = (p) => () => p.read();
