import { Outlet } from "react-router"
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import FloatingBurgerMenu from "../components/floatingburgermenu/FloatingBurgerMenu"
import InitialScroll from "../utils/scrollToTop"

export default function Layout() {
  InitialScroll()
  return (
    <div className="min-h-[100svh] grid grid-rows-[auto_1fr_auto]">
      <header className="row-start-1">
        <Header />
      </header>

      <main className="row-start-2 grid place-items-center">
        <Outlet />
      </main>

      <footer className="row-start-3">
        <Footer />
      </footer>
      <div className="md:hidden">
        <FloatingBurgerMenu />
      </div>
    </div>
  )
}
