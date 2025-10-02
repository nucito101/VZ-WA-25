import { Link } from "react-router"

export default function NotFound() {
  return (
    <div className="w-full max-w-3xl text-center">
      <p className="text-2xl sm:text-3xl font-bold text-dark">404</p>
      <h1 className="mt-2 font-extrabold text-black leading-tight text-[clamp(32px,6vw,72px)]">Page not found</h1>
      <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-dark/80">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <Link
          to="/"
          className="inline-flex h-10 sm:h-11 md:h-12 items-center justify-center rounded-xl bg-yellow px-4 sm:px-5 md:px-6 text-sm sm:text-base font-medium shadow-[0_8px_0_rgba(255,219,99,0.35)] transition-transform hover:translate-y-[1px] hover:shadow-[0_6px_0_rgba(255,219,99,0.3)] focus:outline-none focus:ring-2 focus:ring-yellow/60">
          Go back home
        </Link>
      </div>
    </div>
  )
}
