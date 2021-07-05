import Listr from "listr"
import writeJSON from "write-json-file"
import { Symbols } from "../src/types"
import { isMacOS } from "./utils/is-macOS"
import { ListrClipboard } from "./utils/listr-clipboard"
import { ListrInput } from "./utils/listr-input"
import { ListrMessage } from "./utils/listr-message"
import { isSilentError, SilentError } from "./utils/silent-error"

const SYMBOLS = "./src/data/symbols.json"
const LOGS = "./src/data/logs.json"

interface Context {
  characters: string[]
  names: string[]
  symbols: Symbols
  version: number
}

const tasks = new Listr([
  {
    title: "Verifying requirements",
    task: () => {
      if (!isMacOS()) {
        throw new SilentError("SF Symbols is only available on macOS.")
      }
    }
  },
  {
    title: "Gathering symbols",
    task: () => {
      return new Listr([
        ListrMessage("Select all symbols in SF Symbols", "⌘A"),
        ListrMessage("Copy them", "⌘C"),
        ListrClipboard<Context>("Validate", (value, context) => {
          const characters = Array.from(value)

          if (characters.length <= 1) {
            throw new SilentError("Your clipboard doesn't contain symbols.")
          } else {
            context.characters = characters
          }
        })
      ])
    }
  },
  {
    title: "Gathering symbol names",
    task: () => {
      return new Listr([
        ListrMessage("Select all symbols in SF Symbols", "⌘A"),
        ListrMessage("Copy their names", "⇧⌘C"),
        ListrClipboard<Context>("Validate", (value, context) => {
          const names = value.split(/\r?\n/)

          if (names.length <= 1) {
            throw new SilentError(
              "Your clipboard doesn't contain symbol names."
            )
          } else {
            context.names = names
          }
        })
      ])
    }
  },
  {
    title: "Formatting symbols",
    task: async (context: Context) => {
      if (context.characters.length !== context.names.length) {
        throw new SilentError("The symbols and their names don't match.")
      } else {
        const symbols = context.names.reduce((symbols, name, index) => {
          symbols[name] = context.characters[index]

          return symbols
        }, {})

        context.symbols = Object.keys(symbols)
          .sort()
          .reduce((sortedSymbols, name) => {
            sortedSymbols[name] = symbols[name]

            return sortedSymbols
          }, {})
      }
    }
  },
  {
    title: "Generating files",
    task: () => {
      return new Listr([
        {
          title: "Generating symbols",
          task: async (context: Context) => {
            await writeJSON(SYMBOLS, context.symbols)
          }
        },
        {
          title: "Generating logs",
          task: () => {
            return new Listr([
              {
                title: "Gathering SF Symbols' version",
                task: () => {
                  return new Listr([
                    ListrInput<Context>(
                      "Specify SF Symbols' version",
                      "Version:",
                      (value, context) => {
                        context.version = Number(value)
                      },
                      "SF Symbols › About SF Symbols"
                    )
                  ])
                }
              },
              {
                title: "Generating logs",
                task: async (context: Context) => {
                  await writeJSON(LOGS, {
                    length: context.names.length,
                    version: context.version
                  })
                }
              }
            ])
          }
        }
      ])
    }
  }
])

tasks.run().catch((error: Error | SilentError) => {
  if (isSilentError(error)) return

  console.error(error)
})
