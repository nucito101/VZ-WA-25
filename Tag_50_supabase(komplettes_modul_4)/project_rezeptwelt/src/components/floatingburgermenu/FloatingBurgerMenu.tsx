import { useEffect, useId, useRef, useState } from "react"
import { Link } from "react-router"

export default function FloatingBurgerMenu() {
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const dialogId = useId()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    if (open) {
      document.addEventListener("keydown", onKey)
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
        document.removeEventListener("keydown", onKey)
        btnRef.current?.focus()
      }
    }
  }, [open])

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#FFDB63]/40 backdrop-blur-md border border-white/30 text-neutral-900 shadow-lg ring-1 ring-black/10 transition hover:bg-[#FFDB63]/60 hover:backdrop-blur-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div id={dialogId} role="dialog" aria-modal="true" className="fixed inset-0 z-50">
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 backdrop-blur-xs opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 z-10 grid place-items-center p-6 pointer-events-none">
            <nav className="pointer-events-auto w-full max-w-sm rounded-2xl bg-white shadow-xl ring-1 ring-black/10 p-6 transition duration-200 opacity-100 translate-y-0">
              <div className="flex justify-center w-full">
                <img src="/Ico.svg" alt="" />
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-neutral-900 hover:bg-neutral-100">
                    Home
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/recipes"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-neutral-900 hover:bg-neutral-100">
                    Rezepte
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/aboutus"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-neutral-900 hover:bg-neutral-100">
                    Über uns
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-neutral-900 hover:bg-neutral-100">
                    Login
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
