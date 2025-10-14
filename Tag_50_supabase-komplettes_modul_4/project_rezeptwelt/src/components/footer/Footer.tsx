import { Link } from "react-router"

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#FFDB63]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 sm:items-center">
          {/* Brand */}
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/Ico.svg" alt="Logo" />
            <span className="text-2xl font-semibold text-neutral-900">Die Rezeptwelt</span>
          </Link>
          <div className="sm:justify-self-end">
            <p className="mb-3 text-base font-semibold text-neutral-900">Social Media</p>
            <nav className="flex items-center gap-3">
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-neutral-900/10 text-neutral-900 transition hover:bg-neutral-900/20 focus:outline-none focus:ring-2 focus:ring-neutral-900/30">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1C4.7 20.5 12 20.5 12 20.5s7.3 0 9.4-.6a3 3 0 0 0 2.1-2.1c.4-1.9.5-3.8.5-5.8s-.1-3.9-.5-5.8ZM9.8 15.5v-7l6 3.5-6 3.5Z" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-neutral-900/10 text-neutral-900 transition hover:bg-neutral-900/20 focus:outline-none focus:ring-2 focus:ring-neutral-900/30">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-neutral-900/10 text-neutral-900 transition hover:bg-neutral-900/20 focus:outline-none focus:ring-2 focus:ring-neutral-900/30">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M18.9 2H22l-7 8.1L23 22h-7.1l-5.5-7.3L4 22H1l7.6-8.8L1 2h7.1l5 6.6L18.9 2Zm-1.2 18h2L8.4 4H6.3l11.4 16Z" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-neutral-900/10 text-neutral-900 transition hover:bg-neutral-900/20 focus:outline-none focus:ring-2 focus:ring-neutral-900/30">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M12.2 2C6.8 2 4 5.6 4 9.2c0 1.9.9 4.2 2.5 4.9.2.1.4 0 .5-.2l.7-2.6c.1-.2 0-.4-.1-.6C7.1 10.1 7 9.5 7 8.9 7 6 9.1 4 12.1 4c2.6 0 4.5 1.6 4.5 4.2 0 3-1.3 5.6-3.2 5.6-.9 0-1.6-.7-1.4-1.6.3-1.4.8-2.9.8-3.9 0-.9-.5-1.7-1.6-1.7-1.3 0-2.3 1.3-2.3 3.1 0 1.1.4 1.9.4 1.9l-1.7 7.1c-.5 2 0 4.5 0 4.5h1.2s.8-1.7 1.1-3.3l.7-2.8c.4.8 1.6 1.5 2.8 1.5 3.6 0 6.1-3.3 6.1-7.7C20.5 5.3 17 2 12.2 2Z" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
