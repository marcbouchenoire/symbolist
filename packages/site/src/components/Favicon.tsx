import Head from "next/head"

interface Props {
  children: string
}

export function Favicon({ children }: Props) {
  return (
    <Head>
      <link
        href={`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50%" y="50%" font-size="90" dominant-baseline="central" text-anchor="middle">${children}</text></svg>`}
        rel="icon"
      />
    </Head>
  )
}
