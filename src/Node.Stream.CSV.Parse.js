import {parse, Parser} from 'csv-parse'

class ParserWithColumns extends Parser {
  /** @type {Array<string>} */
  columns = []
  /** @type {Map<string, number> | null} */
  columnsMap = null
}

/** @type {(s: import('csv-parse').Options) => () => ParserWithColumns} */
export const makeImpl = c => () => {
  const parser = new ParserWithColumns(c)
  parser.once('data', chunk => {
    parser.columns = chunk;
  })
  return parser
}

/** @type {(s: ParserWithColumns) => () => Array<string> | null} */
export const readImpl = p => () => p.read();

/** @type {(s: ParserWithColumns) => () => Array<string>} */
export const columnsArrayImpl = p => () => p.columns

/** @type {(s: ParserWithColumns) => () => Map<string, number> | null} */
export const columnsMapImpl = p => () => p.columnsMap

/** @type {(s: ParserWithColumns) => (m: Map<string, number>) => () => void} */
export const setColumnsMapImpl = p => m => () => p.columnsMap = m
