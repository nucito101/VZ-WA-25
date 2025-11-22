import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getCreatedCount, getCreatedRecipes, updateProfile, type Recipe } from "../../function/getProfile"
import { Alert } from "../../components/alert/Alert"
import { ProfileHeader } from "../../components/profileheader/ProfileHeader"
import { ProfileEditForm } from "../../components/profileEditForm/ProfileEditForm"
import { StatCard } from "../../components/statCard/StatCard"
import { RecipesGrid } from "../../components/recipesGrid.tsx/RecipesGrid"
import { useRecipe } from "../../function/getRecipes"

export default function ProfilePage() {
  const navigate = useNavigate()
  const { userId, profile, loadingProfile, authChecked, refreshProfile } = useRecipe()

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [savedCount] = useState<number>(0)
  const [createdCount, setCreatedCount] = useState<number>(0)
  const [showCreated, setShowCreated] = useState(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [recipesLoading, setRecipesLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (authChecked && !userId) {
      navigate("/login?redirect=/profile")
    }
  }, [authChecked, userId, navigate])

  useEffect(() => {
    if (!userId) return
    let cancelled = false

    ;(async () => {
      try {
        setError(null)
        const [myCount, list] = await Promise.all([
          getCreatedCount(userId),
          (async () => {
            setRecipesLoading(true)
            const r = await getCreatedRecipes(userId)
            return r
          })(),
        ])
        if (cancelled) return
        setCreatedCount(myCount ?? 0)
        setRecipes(list)
      } catch (err: any) {
        if (!cancelled) setError(err.message ?? "Profil-Daten konnten nicht geladen werden.")
      } finally {
        if (!cancelled) setRecipesLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [userId])

  const joinedText =
    profile?.created_at &&
    new Date(profile.created_at).toLocaleDateString(undefined, { year: "numeric", month: "short" })

  function startEditing() {
    setIsEditing(true)
    setMessage(null)
    setError(null)
  }

  function cancelEditing() {
    setIsEditing(false)
    setMessage(null)
    setError(null)
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!profile) return

    const formData = new FormData(e.currentTarget)
    const firstname = (formData.get("first_name") as string)?.trim()
    const lastname = (formData.get("last_name") as string)?.trim()
    const username = (formData.get("username") as string)?.trim()

    if (!firstname || !lastname || !username || username.length < 3) {
      setError("Bitte alle Felder ausfüllen. Benutzername min. 3 Zeichen.")
      return
    }

    setSaving(true)
    setError(null)
    setMessage(null)
    try {
      await updateProfile(profile.id, { first_name: firstname, last_name: lastname, username })
      await refreshProfile()
      setMessage("Profil gespeichert.")
      setIsEditing(false)
    } catch (err: any) {
      setError(err.message ?? "Fehler beim Speichern.")
    } finally {
      setSaving(false)
    }
  }

  if (loadingProfile) {
    return (
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-2xl border p-8 bg-white shadow">
            <p className="animate-pulse text-gray-500">Profil lädt…</p>
          </div>
        </div>
      </section>
    )
  }

  if (!profile) {
    return (
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Alert tone="error" onClose={() => setError(null)}>
            Kein Profil gefunden.
          </Alert>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* HEADER + Banner */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <ProfileHeader
            firstName={profile.first_name}
            lastName={profile.last_name}
            email={profile.email}
            username={profile.username}
            joinedText={joinedText}
            isEditing={isEditing}
            saving={saving}
            onStartEdit={startEditing}
            onCancelEdit={cancelEditing}
            error={error}
            message={message}
            onClearAlert={() => {
              setError(null)
              setMessage(null)
            }}
            avatarPathFromDb={profile.avatar_url}
            onAvatarUpdated={async () => {
              // Nach Upload neu laden und eine kleine Erfolgsmeldung zeigen
              await refreshProfile()
              setMessage("Profilbild aktualisiert.")
            }}
          />

          {/* Bearbeitungsformular */}
          {isEditing && (
            <ProfileEditForm
              defaultValues={{
                first_name: profile.first_name,
                last_name: profile.last_name,
                username: profile.username,
              }}
              onSubmit={handleSave}
              saving={saving}
            />
          )}
        </div>
      </section>

      {/* STATS + Created */}
      <section className="w-full py-12 md:py-16">
        <div className="w-full mx-auto px-4 text-center">
          <h2 className="mb-8 text-xl font-semibold">Deine Statistiken</h2>

          <div className="flex flex-wrap justify-center gap-6">
            <StatCard value={savedCount} label="Rezepte gespeichert" onClick={() => navigate("/recipes/favorites")} />
            <StatCard
              value={createdCount}
              label="Rezepte erstellt"
              active={showCreated}
              onClick={() => setShowCreated((prev) => !prev)}
            />
            <StatCard value="+" label="Neues Rezept" onClick={() => navigate("/recipe/new")} />
          </div>

          {showCreated && (
            <div className="mt-10 text-left w-full">
              <h3 className="text-lg text-center font-semibold mb-4">Deine erstellten Rezepte</h3>

              {recipesLoading ? (
                <Alert tone="info" duration={2500}>
                  Läd…
                </Alert>
              ) : (
                <RecipesGrid recipes={recipes} />
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
