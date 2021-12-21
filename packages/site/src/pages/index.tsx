import { readFile } from "fs/promises"
import { GetStaticProps } from "next"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrism from "rehype-prism-plus"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import pkg from "../../../symbolist/package.json"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Symbols } from "../components/Symbols"
import rehypeRemoveImages from "../plugins/rehype/remove-images"
import rehypeWrapSymbols from "../plugins/rehype/wrap-symbols"
import remarkFilterHeadings from "../plugins/remark/filter-headings"
import remarkFindNode from "../plugins/remark/find-node"

interface Props {
  content: string
  date: string
  features: string
  version: string
}

function Page({ date, content, features, version }: Props) {
  return (
    <>
      <div className="overflow-hidden absolute top-0 w-screen h-72 md:h-80 lg:h-96 pointer-events-none">
        <div className="relative h-full content">
          <div className="absolute h-full opacity-30 aura w-[300%] md:w-[400%] left-[-100%] md:left-[-150%] z-negative" />
        </div>
      </div>
      <Header
        className="pt-5 md:pt-6 lg:pt-8 content"
        features={features}
        version={version}
      />
      <div className="my-8 md:my-12 lg:my-16 content">
        <div className="flex gap-2 sm:gap-3 p-5 pl-4 text-sm rounded-md bg-primary-500/10 dark:bg-primary-400/20">
          <svg
            className="flex-none text-primary-500 dark:text-primary-400"
            height="24"
            role="presentation"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M3.773 15.986 10.276 4.93c.774-1.315 2.675-1.315 3.448 0l6.503 11.055C21.011 17.319 20.05 19 18.503 19H5.497c-1.547 0-2.508-1.68-1.724-3.014ZM12 8a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1Zm-1 8a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          <div>
            <small className="font-semibold tracking-widest leading-none uppercase text-primary-500 dark:text-primary-400 text-2xs">
              Seeing missing characters
              <span className="hidden sm:inline"> instead of symbols</span>?
            </small>
            <p className="mt-2 leading-relaxed text-zinc-700 dark:text-zinc-100">
              <a
                className="font-medium link link-primary focusable"
                href="https://developer.apple.com/sf-symbols/"
              >
                SF Symbols
              </a>{" "}
              require San Fransisco—the system font on Apple platforms—installed
              to be visible. Additionally, you’ll also need{" "}
              <a
                className="font-medium link link-primary focusable"
                href="https://developer.apple.com/fonts/"
              >
                SF Pro
              </a>{" "}
              installed when using Chromium-based browsers or Firefox.
            </p>
          </div>
        </div>
      </div>
      <Symbols className="mb-10 md:mb-16 lg:mb-20 content-lg" />
      <article
        className="my-10 md:my-16 lg:my-20 prose content prose-zinc dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="content">
        <hr className="w-full border-t border-zinc-150 dark:border-zinc-800" />
      </div>
      <Footer
        className="flex items-center my-8 md:my-10 lg:my-12 content pb-0-safe"
        date={date}
      />
    </>
  )
}

export default Page

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = await readFile("../../packages/symbolist/README.md")
  const processor = unified().use(remarkParse)

  const features = await processor()
    .use(remarkFindNode, "list")
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(file)

  const content = await processor()
    .use(remarkFilterHeadings, { exclude: [{ depth: 1 }] })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeRemoveImages)
    .use(rehypePrism)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { content: [] })
    .use(rehypeWrapSymbols)
    .use(rehypeStringify)
    .process(file)

  return {
    props: {
      version: pkg.version,
      date: String(new Date().getFullYear()),
      content: String(content.value),
      features: String(features.value)
    }
  }
}
