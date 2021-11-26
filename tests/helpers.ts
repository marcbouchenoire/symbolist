export function mock<T>(object: T, name: keyof T, mock: any = undefined) {
  const origin = object[name]

  object[name] = mock

  return () => {
    object[name] = origin
  }
}
