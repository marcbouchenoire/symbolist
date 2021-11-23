import withApp from "app-exists"
import Listr from "listr"
import * as prettier from "prettier"
import writeFile from "write-file-atomic"
import { writeJsonFile } from "write-json-file"
import { SymbolName } from "../src"
import { Symbols } from "../src/types"
import { isMacOS } from "./utils/is-macOS"
import { ListrClipboard } from "./utils/listr-clipboard"
import { ListrInput } from "./utils/listr-input"
import { ListrMessage } from "./utils/listr-message"
import { SilentError, isSilentError } from "./utils/silent-error"

const SYMBOLS = "./src/data/symbols.json"
const LOGS = "./src/data/logs.json"
const TYPES = "./src/data/types.ts"

interface Context {
  characters: string[]
  names: string[]
  symbols: Symbols
  version: string
}

const versionRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?$/

const tasks = new Listr([
  {
    task: () => {
      if (!isMacOS()) {
        throw new SilentError("SF Symbols is only available on macOS.")
      } else if (!withApp("SF Symbols")) {
        throw new SilentError(
          `SF Symbols is required. (https://developer.apple.com/sf-symbols/)")}`
        )
      }
    },
    title: "Verifying requirements"
  },
  {
    task: () => {
      return new Listr([
        ListrMessage("Select all symbols in SF Symbols", "⌘A"),
        ListrMessage("Copy them", "⌘C"),
        ListrClipboard<Context>("Validate", (value, context) => {
          const characters = [...value]

          if (characters.length <= 1) {
            throw new SilentError("Your clipboard doesn't contain symbols.")
          } else {
            context.characters = characters
          }
        })
      ])
    },
    title: "Gathering symbols"
  },
  {
    task: () => {
      return new Listr([
        ListrMessage("Select all symbols in SF Symbols", "⌘A"),
        ListrMessage("Copy their names", "⇧⌘C"),
        ListrClipboard<Context>("Validate", (value, context) => {
          const names = value.split(/\n/)

          if (names.length <= 1) {
            throw new SilentError(
              "Your clipboard doesn't contain symbol names."
            )
          } else {
            context.names = names
          }
        })
      ])
    },
    title: "Gathering symbol names"
  },
  {
    task: async (context: Context) => {
      if (context.characters.length !== context.names.length) {
        throw new SilentError("The symbols and their names don't match.")
      } else {
        const symbols = {} as Symbols

        for (const [index, name] of context.names.entries()) {
          symbols[name as SymbolName] = context.characters[index]
        }

        context.symbols = symbols
      }
    },
    title: "Formatting symbols"
  },
  {
    task: () => {
      return new Listr([
        {
          task: async (context: Context) => {
            await writeJsonFile(SYMBOLS, context.symbols, { sortKeys: true })
          },
          title: "Generating symbols"
        },
        {
          task: async (context: Context) => {
            const options = await prettier.resolveConfig(".prettierrc")
            const types = context.names.map((name) => `"${name}"`).join(" | ")

            await writeFile(
              TYPES,
              prettier.format(`export type SymbolName = ${types}`, {
                ...options,
                parser: "typescript"
              })
            )
          },
          title: "Generating types"
        },
        {
          task: () => {
            return new Listr([
              {
                task: () => {
                  return new Listr([
                    ListrInput<Context>(
                      "Specify SF Symbols' version",
                      "Version:",
                      (value, context) => {
                        if (versionRegex.test(value)) {
                          context.version = value
                        } else {
                          throw new SilentError(
                            "The version number is incorrect."
                          )
                        }
                      },
                      "SF Symbols › About SF Symbols"
                    )
                  ])
                },
                title: "Gathering SF Symbols' version"
              },
              {
                task: async (context: Context) => {
                  await writeJsonFile(LOGS, {
                    length: context.names.length,
                    version: context.version
                  })
                },
                title: "Generating logs"
              }
            ])
          },
          title: "Generating logs"
        }
      ])
    },
    title: "Generating files"
  }
])

tasks.run().catch((error: Error | SilentError) => {
  if (isSilentError(error)) return

  console.error(error)
})
