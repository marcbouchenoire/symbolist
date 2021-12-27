type ListrInputCallback<T = void> = (value: string) => T

interface ListrInputOptions {
  /**
   * A function to decide whether to submit the current value.
   */
  autoSubmit: ListrInputCallback<boolean>

  /**
   * Default value to use if nothing is entered.
   */
  default: string

  /**
   * A function that will be invoked when submitting.
   */
  done: ListrInputCallback

  /**
   * Mark the input as secret.
   */
  secret: boolean

  /**
   * A function to validate the current value.
   */
  validate: ListrInputCallback<boolean>
}

declare module "listr-input" {
  export default function (
    question: string,
    options?: Partial<ListrInputOptions>
  ): void
}
