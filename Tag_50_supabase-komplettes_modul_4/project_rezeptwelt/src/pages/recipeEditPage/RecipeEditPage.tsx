// src/pages/RecipeEditPage.tsx
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import supabase from "../../utils/supabase"
import FormCard from "../../components/formCard/FormCard"
import InputField from "../../components/inputField/InputField"
import { useRecipe } from "../../function/getRecipes"
import { Alert } from "../../components/alert/Alert"

type Recipe = {
  id: string
  name: string
  description: string
  servings: number
  instructions: string
  category_id: string
  created_at: string
}

type Ingredient = {
  id?: string
  recipe_id?: string
  name: string
  quantity?: number | null
  unit?: string | null
  additional_info?: string | null
}

type Category = { id: string; name: string }

export default function RecipeEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { userId } = useRecipe()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [rows, setRows] = useState<Ingredient[]>([])
  const [isOwner, setIsOwner] = useState(false)

  // Initial laden: Rezept, Kategorien, Zutaten + Owner-Check
  useEffect(() => {
    let active = true
    const load = async () => {
      if (!id) return
      setLoading(true)
      setError(null)

      try {
        // Rezept
        const { data: r, error: rErr } = await supabase
          .from("recipes")
          .select("id, name, description, servings, instructions, category_id, created_at")
          .eq("id", id)
          .single()
        if (rErr) throw rErr
        if (!active) return
        setRecipe(r as Recipe)

        // Kategorien
        const { data: cats, error: cErr } = await supabase
          .from("categories")
          .select("id, name")
          .order("name", { ascending: true })
        if (cErr) throw cErr
        if (!active) return
        setCategories((cats || []) as Category[])

        // Zutaten
        const { data: ings, error: iErr } = await supabase
          .from("ingredients")
          .select("id, name, quantity, unit, additional_info")
          .eq("recipe_id", id)
          .order("created_at", { ascending: true })
        if (iErr) throw iErr
        if (!active) return
        setRows(
          (ings || []).map((it) => ({
            id: it.id,
            name: it.name ?? "",
            quantity: it.quantity ?? null,
            unit: it.unit ?? "",
            additional_info: it.additional_info ?? "",
          }))
        )

        // Owner-Check via user_recipes
        if (userId) {
          const { count, error: oErr } = await supabase
            .from("user_recipes")
            .select("id", { count: "exact", head: true })
            .eq("user_id", userId)
            .eq("recipe_id", id)
          if (oErr) throw oErr
          if (!active) return
          setIsOwner((count ?? 0) > 0)
        } else {
          setIsOwner(false)
        }
      } catch (e: any) {
        if (active) setError(e?.message ?? "Daten konnten nicht geladen werden.")
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [id, userId])

  // Zutaten-Row Helpers
  const addRow = () => setRows((p) => [...p, { name: "", quantity: null, unit: "", additional_info: "" }])
  const updateRow = (idx: number, patch: Partial<Ingredient>) =>
    setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)))
  const removeRow = (idx: number) => setRows((prev) => prev.filter((_, i) => i !== idx))

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!recipe) return
    if (!isOwner) {
      setError("Du darfst dieses Rezept nicht bearbeiten.")
      return
    }

    const form = new FormData(e.currentTarget)
    const name = (form.get("name") as string)?.trim()
    const description = (form.get("description") as string)?.trim()
    const servings = Number(form.get("servings") || 0)
    const category_id = form.get("category_id") as string
    const instructions = (form.get("instructions") as string) ?? ""

    if (!name || !description || !servings || !category_id) {
      setError("Bitte alle Pflichtfelder ausfüllen.")
      return
    }

    setSaving(true)
    setError(null)
    setMessage(null)

    try {
      // 1) Rezept updaten
      const { error: ruErr } = await supabase
        .from("recipes")
        .update({ name, description, servings, instructions, category_id })
        .eq("id", recipe.id)
      if (ruErr) throw ruErr

      // 2) Zutaten differenziell synchronisieren
      const { data: current, error: curErr } = await supabase
        .from("ingredients")
        .select("id")
        .eq("recipe_id", recipe.id)
      if (curErr) throw curErr
      const currentIds = new Set((current || []).map((x: any) => x.id))

      for (const row of rows) {
        const payload = {
          recipe_id: recipe.id,
          name: (row.name || "").trim(),
          quantity: row.quantity ?? null,
          unit: row.unit ? String(row.unit).trim() : null,
          additional_info: row.additional_info ? String(row.additional_info).trim() : null,
        }

        if (row.id) {
          const { error: uErr } = await supabase.from("ingredients").update(payload).eq("id", row.id)
          if (uErr) throw uErr
          currentIds.delete(row.id)
        } else {
          const { error: iErr } = await supabase.from("ingredients").insert(payload)
          if (iErr) throw iErr
        }
      }

      if (currentIds.size > 0) {
        const idsToDelete = Array.from(currentIds)
        const { error: dErr } = await supabase.from("ingredients").delete().in("id", idsToDelete)
        if (dErr) throw dErr
      }

      setMessage("Rezept gespeichert.")
      // navigate(`/recipe/${recipe.id}`)
    } catch (e: any) {
      console.error(e)
      setError(e?.message ?? "Speichern fehlgeschlagen.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <section className="mx-auto flex justify-center px-4 py-10 sm:px-6">
        <FormCard size="l" title="Rezept bearbeiten">
          <p className="animate-pulse text-gray-500 text-center">Rezept wird geladen…</p>
        </FormCard>
      </section>
    )
  }

  if (!recipe) {
    return (
      <section className="mx-auto flex justify-center px-4 py-10 sm:px-6">
        <FormCard size="l" title="Rezept bearbeiten">
          <Alert tone="error">Rezept nicht gefunden.</Alert>
        </FormCard>
      </section>
    )
  }

  return (
    <section className="mx-auto flex justify-center px-4 py-10 sm:px-6">
      <FormCard size="l" title="Rezept bearbeiten" subtitle="Passe die Felder an und speichere deine Änderungen.">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 text-center">
              {error}
            </div>
          )}
          {message && (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 text-center">
              {message}
            </div>
          )}

          {/* Grunddaten */}
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              className="sm:col-span-2"
              label="Rezeptname"
              required
              name="name"
              defaultValue={recipe.name}
              placeholder="z.B. Cheesecake"
            />

            <InputField label="Kategorie" required name="category_id" as="select" defaultValue={recipe.category_id}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </InputField>

            <InputField
              label="Portionen"
              required
              name="servings"
              type="number"
              min={1}
              step={1}
              defaultValue={recipe.servings}
            />

            <InputField
              label="Kurzbeschreibung"
              name="description"
              className="sm:col-span-2"
              defaultValue={recipe.description}
              placeholder="Was macht das Rezept besonders?"
            />

            <InputField
              as="textarea"
              label="Anweisungen"
              required
              name="instructions"
              className="sm:col-span-2"
              rows={8}
              defaultValue={recipe.instructions}
              placeholder="1. ..."
            />
          </div>

          {/* Zutaten */}
          <div className="mt-2 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-900">Zutaten</h2>
              <button
                type="button"
                onClick={addRow}
                className="inline-flex items-center gap-2 rounded-full bg-[#FFDB63] px-4 py-2 text-sm font-medium text-neutral-900 shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)] transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2">
                + Zutat
              </button>
            </div>

            {rows.map((row, index) => (
              <div
                key={row.id ?? `row-${index}`}
                className="flex flex-wrap items-end gap-2 rounded-xl border border-neutral-200/60 bg-neutral-50/60 p-3">
                <InputField
                  className="flex-1 min-w-[180px]"
                  label="Bezeichnung"
                  name={`ingredient_name_${index}`}
                  placeholder="z.B. Frischkäse"
                  required
                  defaultValue={row.name ?? ""}
                />
                <InputField
                  className="w-[100px]"
                  label="Menge"
                  name={`ingredient_quantity_${index}`}
                  type="number"
                  placeholder="500"
                  defaultValue={row.quantity ?? ""}
                />
                <InputField
                  className="w-[100px]"
                  label="Einheit"
                  name={`ingredient_unit_${index}`}
                  placeholder="g"
                  defaultValue={row.unit ?? ""}
                />
                <InputField
                  className="flex-1 min-w-[140px]"
                  label="Zusatz"
                  name={`ingredient_additional_${index}`}
                  placeholder="optional"
                  defaultValue={row.additional_info ?? ""}
                />

                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  aria-label="Zutat entfernen"
                  className="h-10 w-10 shrink-0 rounded-xl border border-neutral-300 bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2">
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 flex flex-col-reverse items-stretch gap-3 border-t border-neutral-200/70 pt-4 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-neutral-700 ring-1 ring-inset ring-neutral-300 transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2">
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={saving || !isOwner}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFDB63] px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)] transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
              {saving ? "Speichert…" : "Änderungen speichern"}
            </button>
          </div>

          {!isOwner && (
            <p className="text-xs text-red-600 text-center">
              Du bist nicht Besitzer dieses Rezepts und kannst keine Änderungen speichern.
            </p>
          )}
        </form>
      </FormCard>
    </section>
  )
}
