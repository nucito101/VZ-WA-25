import { NavLink, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import supabase from "../../utils/supabase"
import { useRecipe } from "../../function/getRecipes"
import { AvatarCircle } from "../avatarCircle/AvatarCircle"
import { getSignedAvatarUrl } from "../../function/uploadPhoto"

export default function Navbar() {
  const { userId, profile, authChecked, loadingProfile } = useRecipe()
  const navigate = useNavigate()

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  useEffect(() => {
    let isMounted = true

    const loadAvatar = async () => {
      if (profile?.avatar_url) {
        const signedUrl = await getSignedAvatarUrl(profile.avatar_url)
        if (isMounted) setAvatarUrl(signedUrl)
      } else {
        setAvatarUrl(null)
      }
    }

    loadAvatar()
    return () => {
      isMounted = false
    }
  }, [profile?.avatar_url])

  const linkClass = "text-neutral-800 hover:text-[#FFB800] transition-colors font-semibold flex items-center gap-2"

  if (!authChecked || loadingProfile) {
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
      </nav>
    )
  }

  return (
    <nav className="flex justify-center items-center gap-6 sm:gap-8 md:gap-10 text-sm sm:text-base font-medium">
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/recipes" className={linkClass}>
        Rezepte
      </NavLink>
      <NavLink to="/aboutus" className={linkClass}>
        Über uns
      </NavLink>

      {userId ? (
        <>
          <NavLink to="/profile" className={linkClass}>
            {/* Profilbild oder Avatar */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profilbild"
                className="w-8 h-8 rounded-full object-cover border border-neutral-300"
              />
            ) : (
              <AvatarCircle
                label={profile?.first_name?.[0] || "?"}
                size={32}
                className="bg-neutral-200 text-neutral-700"
                spanClass="!text-xs"
              />
            )}
            {/* Benutzername */}
            <span>{profile?.username || "Profil"}</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="font-semibold text-neutral-800 hover:text-red-500 transition-colors">
            Abmelden
          </button>
        </>
      ) : (
        <NavLink to="/login" className={linkClass}>
          Login
        </NavLink>
      )}
    </nav>
  )
}
