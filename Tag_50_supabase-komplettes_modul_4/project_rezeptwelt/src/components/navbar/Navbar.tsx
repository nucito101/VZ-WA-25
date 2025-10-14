import { NavLink } from "react-router"

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-center gap-8 sm:gap-5 md:gap-6 lg:gap-10 text-sm sm:text-base md:text-lg font-semibold">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/recipes"}>Rezepte</NavLink>
        <NavLink to={"/aboutus"}>Über uns</NavLink>
        <NavLink to={"/recipe/new"}>Add Recipe</NavLink>
        <NavLink to={"/login"}>Login</NavLink>
      </nav>
    </>
  )
}
