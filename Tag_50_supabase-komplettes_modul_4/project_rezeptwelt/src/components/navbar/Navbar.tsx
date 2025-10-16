import { NavLink, useNavigate } from "react-router"
import supabase from "../../utils/supabase"
import { useRecipe } from "../../function/getRecipes"

export default function Navbar() {
  const { user } = useRecipe()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  const linkClass = "text-neutral-800 hover:text-[#FFB800] transition-colors font-semibold"

  return (
    <nav className="flex justify-center gap-6 sm:gap-8 md:gap-10 text-sm sm:text-base font-medium">
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/recipes" className={linkClass}>
        Rezepte
      </NavLink>
      <NavLink to="/aboutus" className={linkClass}>
        Über uns
      </NavLink>

      {user ? (
        <>
          <NavLink to="/profile" className={linkClass}>
            Profil
          </NavLink>
          <button
            onClick={handleLogout}
            className="font-semibold text-neutral-800 hover:text-red-500 transition-colors">
            Abmelden
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
        </>
      )}
    </nav>
  )
}
