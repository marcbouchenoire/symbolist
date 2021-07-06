type ListrInputCallback<T = void> = (value: string) => T

interface ListrInputOptions {
  autoSubmit: ListrInputCallback<boolean>
  default: string
  done: ListrInputCallback
  secret: boolean
  validate: ListrInputCallback<boolean>
}

declare module "listr-input" {
  export default function (
    question: string,
    options?: Partial<ListrInputOptions>
  ): void
}
