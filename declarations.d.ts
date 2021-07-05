type ListrInputCallback<T = void> = (value: string) => T

interface ListrInputOptions {
  default: string
  validate: ListrInputCallback<boolean>
  secret: boolean
  done: ListrInputCallback
  autoSubmit: ListrInputCallback<boolean>
}

declare module "listr-input" {
  export default function (
    question: string,
    options?: Partial<ListrInputOptions>
  ): void
}
