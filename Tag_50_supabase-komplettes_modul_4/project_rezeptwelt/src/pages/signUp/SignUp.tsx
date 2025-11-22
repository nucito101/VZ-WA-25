import { useState } from "react"
import supabase from "../../utils/supabase"
import FormCard from "../../components/formCard/FormCard"
import InputField from "../../components/inputField/InputField"
import { Link, useNavigate } from "react-router"

export default function SignUp() {
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
      username: string
      first_name: string
      last_name: string
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formObj.email,
        password: formObj.password,
        options: {
          data: {
            username: formObj.username,
            first_name: formObj.first_name,
            last_name: formObj.last_name,
          },
        },
      })

      if (error) throw error

      setMessage("Konto erstellt! Bitte prüfe deine E-Mails zur Bestätigung.")
      navigate("/profile")
    } catch (err: any) {
      setMessage(err?.message ?? "Registrierung fehlgeschlagen.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto flex justify-center px-4 py-10 sm:px-6">
      <FormCard size="sm" title="Registrieren" subtitle="Erstelle dein Konto, um Rezepte anzulegen und zu speichern.">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField
            label="E-Mail"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="max.mustermann@email.de"
            required
          />

          <InputField
            label="Passwort"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            required
          />

          <InputField label="Benutzername" name="username" placeholder="username" autoComplete="username" required />

          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label="Vorname" name="first_name" autoComplete="given-name" placeholder="Max" required />
            <InputField
              label="Nachname"
              name="last_name"
              autoComplete="family-name"
              placeholder="Mustermann"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#FFDB63] px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)] transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Erstelle…" : "Registrieren"}
          </button>

          {message && <p className="text-center text-sm text-neutral-700">{message}</p>}

          <p className="text-center text-sm text-neutral-600">
            Schon ein Konto?{" "}
            <Link to="/login" className="font-medium text-[#FFB800] hover:text-[#E6A700] transition">
              Hier einloggen
            </Link>
          </p>
        </form>
      </FormCard>
    </section>
  )
}
