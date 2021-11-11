const SILENT_ERROR_NAME = "SilentError"

export class SilentError extends Error {
  constructor(message: string) {
    super(message)

    this.name = SILENT_ERROR_NAME
  }
}

export function isSilentError(
  error: Error | SilentError
): error is SilentError {
  return error.name === SILENT_ERROR_NAME
}
