export async function isSupportedFont(font: string) {
  let support = false

  try {
    await document.fonts.ready

    support = document.fonts.check(`0px ${font}`)
  } catch {
    support = false
  }

  return support
}
