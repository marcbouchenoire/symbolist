import Link from "next/link"

/**
 * The 404 page component.
 */
function Page() {
  return (
    <main className="content flex flex-1 flex-col items-center justify-center py-12 text-center md:py-16 lg:py-20">
      <h1 className="mb-3 text-3xl font-extrabold text-zinc-800 dark:text-zinc-100 sm:mb-4 sm:text-4xl">
        Oops
      </h1>
      <p className="mb-6 text-lg text-zinc-700 dark:text-zinc-300 sm:text-xl">
        The page you are looking for doesn’t exist.
      </p>
      <Link
        className="hover:bg-primary-500/80 dark:hover:bg-primary-400/80 hover:shadow-primary-500/5 dark:hover:shadow-primary-400/5 bg-primary-500 dark:bg-primary-400 focusable shadow-primary-500/10 dark:shadow-primary-400/10 flex w-full flex-none cursor-pointer items-center justify-center gap-2 rounded-md py-2 px-4 font-medium text-white shadow-lg transition selection:bg-white/30 dark:text-zinc-900 dark:selection:bg-zinc-900/30 sm:w-auto"
        href="/"
      >
        Return to home page
      </Link>
    </main>
  )
}

export default Page
