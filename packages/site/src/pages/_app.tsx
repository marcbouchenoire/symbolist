import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import Head from "next/head"
import { Footer } from "../components/layout/Footer"
import { Header } from "../components/layout/Header"
import "../styles/fonts.css"
import "../styles/main.css"

/**
 * A custom `App` component, used to initialize pages.
 *
 * @param props - A set of props.
 * @param props.Component - The active page component.
 * @param props.pageProps - The initial props preloaded for the page.
 */
function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <Head>
        <title>Symbolist</title>
        <meta content="Symbolist" name="title" />
        <meta content="Marc Bouchenoire" name="author" />
        <meta content="initial-scale=1, viewport-fit=cover" name="viewport" />
        <meta
          content="A collection of every symbol from SF Symbols."
          name="description"
        />
        <meta content="website" property="og:type" />
        <meta
          content="https://symbolist.marcbouchenoire.com"
          property="og:url"
        />
        <meta content="Symbolist" property="og:title" />
        <meta
          content="A collection of every symbol from SF Symbols."
          property="og:description"
        />
        <meta
          content="https://symbolist.marcbouchenoire.com/meta.png"
          property="og:image"
        />
        <meta
          content="https://symbolist.marcbouchenoire.com"
          property="twitter:url"
        />
        <meta content="@marcbouchenoire" property="twitter:creator" />
        <meta content="Symbolist" property="twitter:title" />
        <meta
          content="A collection of every symbol from SF Symbols."
          property="twitter:description"
        />
        <meta
          content="https://symbolist.marcbouchenoire.com/meta.png"
          property="twitter:image"
        />
        <link href="/favicon.png" rel="icon" sizes="any" type="image/png" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <meta content="#e37" name="theme-color" />
      </Head>
      <div className="pointer-events-none absolute top-0 h-72 w-full overflow-hidden md:h-80 lg:h-96">
        <div className="content relative h-full">
          <div className="aura z-negative absolute left-[-100%] h-full w-[300%] opacity-30 md:left-[-150%] md:w-[400%]" />
        </div>
      </div>
      <Header className="content" />
      <Component {...pageProps} />
      <Footer className="content pb-0-safe" />
    </ThemeProvider>
  )
}

export default App
