import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router"
import supabase from "../../utils/supabase"
import FormCard from "../../components/formCard/FormCard"
import InputField from "../../components/inputField/InputField"

export default function Login() {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const formObj = Object.fromEntries(new FormData(e.currentTarget)) as {
      email: string
      password: string
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formObj.email,
        password: formObj.password,
      })

      if (error) throw error
      setMessage("Erfolgreich eingeloggt!")
      navigate("/profile")
    } catch (err: any) {
      setMessage(err?.message ?? "Login fehlgeschlagen.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto flex justify-center px-4 py-10 sm:px-6">
      <FormCard size="sm" title="Anmelden" subtitle="Melde dich an, um deine gespeicherten Rezepte zu verwalten.">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField
            label="E-Mail"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="dein@email.de"
            required
          />

          <InputField
            label="Passwort"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#FFDB63] px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)] transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Lädt…" : "Login"}
          </button>

          {message && <p className="text-center text-sm text-neutral-700">{message}</p>}

          <p className="text-center text-sm text-neutral-600">
            Noch kein Konto?{" "}
            <Link to="/signup" className="font-medium text-[#FFB800] hover:text-[#E6A700] transition">
              Jetzt registrieren
            </Link>
          </p>
        </form>
      </FormCard>
    </section>
  )
}
