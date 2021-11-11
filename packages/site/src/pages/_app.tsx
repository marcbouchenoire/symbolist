import { NextSeo } from "next-seo"
import { AppProps } from "next/app"
import { Favicon } from "../components/Favicon"
import "../styles/main.scss"

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        description="A collection of every symbol from SF Symbols."
        openGraph={{
          images: [
            {
              height: 620,
              url: "https://www.marcbouchenoire.com/api/screenshot/capture/https%3A%2F%2Fwww.marcbouchenoire.com%2Fsymbolist?width=1200&height=620",
              width: 1200
            }
          ],
          profile: {
            firstName: "Marc",
            lastName: "Bouchenoire",
            username: "bouchenoiremarc"
          },
          site_name: "Marc Bouchenoire"
        }}
        title="symbolist"
        twitter={{
          handle: "@bouchenoiremarc"
        }}
      />
      <Favicon>🔣</Favicon>
      <Component {...pageProps} />
    </>
  )
}

export default App
