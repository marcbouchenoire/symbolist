const SILENT_ERROR_NAME = "SilentError"

/**
 * An `Error` that can be filtered and silenced.
 */
export class SilentError extends Error {
  /**
   * Create a `SilentError` with a message.
   *
   * @param message - The error message.
   */
  constructor(message: string) {
    super(message)

    this.name = SILENT_ERROR_NAME
  }
}

/**
 * Whether the error is a `SilentError`.
 *
 * @param error - The error to check.
 */
export function isSilentError(
  error: Error | SilentError
): error is SilentError {
  return error.name === SILENT_ERROR_NAME
}
