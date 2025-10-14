import { useEffect } from "react"
import { useLocation } from "react-router"

interface ScrollToProps {
  position: "top" | "bottom"
}

export const ScrollTo = ({ position }: ScrollToProps): void => {
  switch (position) {
    case "top":
      window.scrollTo({ top: 0, behavior: "smooth" })
      break
    case "bottom":
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      break
    default:
      break
  }
}

export default function InitialScroll(): void {
  const { pathname } = useLocation()

  useEffect(() => {
    ScrollTo({ position: "top" })
  }, [pathname])
}
