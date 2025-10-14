import { useEffect, useState } from "react"
import { useRecipe } from "../../function/getRecipes"
import { createRecipeWithIngredients } from "../../function/createRecipe"
import { useNavigate } from "react-router"

type IngredientRow = {
  name: string
  quantity?: number | null
  unit?: string | null
  additional_info?: string | null
}

export default function CreateRecipePage() {
  const { state, dispatch } = useRecipe()
  const navigate = useNavigate()

  // Formularfelder
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [servings, setServings] = useState<number>(2)
  const [instructions, setInstructions] = useState("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [rows, setRows] = useState<IngredientRow[]>([{ name: "", quantity: undefined, unit: "", additional_info: "" }])
  const [localError, setLocalError] = useState<string | null>(null)

  useEffect(() => {
    if (state.categories.length > 0 && !categoryId) {
      setCategoryId(state.categories[0].id)
    }
  }, [state.categories, categoryId])

  const addRow = () => setRows((p) => [...p, { name: "", unit: "", additional_info: "" }])
  const removeRow = (i: number) => setRows((p) => p.filter((_, idx) => idx !== i))
  const updateRow = (i: number, patch: Partial<IngredientRow>) =>
    setRows((p) => p.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    if (!name.trim()) return setLocalError("Bitte einen Rezeptnamen angeben.")
    if (!categoryId) return setLocalError("Bitte eine Kategorie wählen.")
    if (!instructions.trim()) return setLocalError("Bitte Anweisungen angeben.")
    if (servings <= 0) return setLocalError("Portionen muss > 0 sein.")

    dispatch({ type: "CREATE_RECIPE_START" })
    try {
      const { recipe, ingredients } = await createRecipeWithIngredients(
        {
          name: name.trim(),
          description: description.trim(),
          servings,
          instructions: instructions.trim(),
          category_id: categoryId,
        },
        rows
      )
      dispatch({ type: "CREATE_RECIPE_SUCCESS", payload: { recipe, ingredients } })
      navigate(`/recipe/${recipe.id}`)
    } catch (err: any) {
      const msg = err?.message ?? "Fehler beim Anlegen."
      dispatch({ type: "CREATE_RECIPE_ERROR", payload: msg })
      setLocalError(msg)
    }
  }

  return (
    <section className="mx-auto max-w-3xl p-4 sm:p-6">
      <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <header className="bg-gradient-to-r from-[#FFDB63]/80 to-[#FFD23F]/60 px-6 py-6 sm:px-8">
          <h2 className="text-2xl font-bold text-neutral-900">Neues Rezept anlegen</h2>
        </header>

        <form onSubmit={onSubmit} className="flex flex-col gap-8 p-6 sm:p-8">
          {(state.error || localError) && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error ?? localError}
            </div>
          )}

          {/* Grunddaten */}
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-neutral-800">
                Rezeptname *
              </label>
              <input
                id="name"
                className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-[15px] text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-300 focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2"
                placeholder="z. B. Basque Cheesecake"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="category" className="mb-1 block text-sm font-medium text-neutral-800">
                Kategorie *
              </label>
              <select
                id="category"
                className="w-full appearance-none rounded-xl border border-neutral-300 bg-white px-3 py-2 text-[15px] text-neutral-900 shadow-sm outline-none transition hover:border-neutral-400 focus:border-neutral-300 focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}>
                {state.categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="servings" className="mb-1 block text-sm font-medium text-neutral-800">
                Portionen *
              </label>
              <input
                id="servings"
                type="number"
                min={1}
                className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-[15px] text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-300 focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2"
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="mb-1 block text-sm font-medium text-neutral-800">
                Kurzbeschreibung
              </label>
              <input
                id="description"
                className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-[15px] text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-300 focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2"
                placeholder="Was macht das Rezept besonders?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="instructions" className="mb-1 block text-sm font-medium text-neutral-800">
                Anweisungen *
              </label>
              <textarea
                id="instructions"
                rows={6}
                className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-[15px] text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-300 focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2"
                placeholder="1. …"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>
          </section>

          {/* Zutaten */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-900">Zutaten</h2>
              <button
                type="button"
                onClick={addRow}
                className="inline-flex items-center gap-2 rounded-full bg-[#FFDB63] px-4 py-2 text-sm font-medium text-neutral-900 shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)] transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2">
                + Zutat
              </button>
            </div>

            <div className="space-y-3">
              {rows.map((row, idx) => (
                <div
                  key={idx}
                  className="flex flex-wrap items-end gap-2 rounded-xl border border-neutral-200/60 bg-neutral-50/60 p-3">
                  <div className="flex-1 min-w-[180px]">
                    <label className="mb-1 block text-sm font-medium text-neutral-800">Bezeichnung *</label>
                    <input
                      className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-[15px] text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-300 focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2"
                      placeholder="z. B. Frischkäse"
                      value={row.name ?? ""}
                      onChange={(e) => updateRow(idx, { name: e.target.value })}
                    />
                  </div>

                  <div className="w-[100px]">
                    <label className="mb-1 block text-sm font-medium text-neutral-800">Menge</label>
                    <input
                      type="number"
                      step="any"
                      className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-[15px] text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-300 focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2"
                      placeholder="500"
                      value={row.quantity ?? ""}
                      onChange={(e) =>
                        updateRow(idx, { quantity: e.target.value === "" ? undefined : Number(e.target.value) })
                      }
                    />
                  </div>

                  <div className="w-[100px]">
                    <label className="mb-1 block text-sm font-medium text-neutral-800">Einheit</label>
                    <input
                      className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-[15px] text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-300 focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2"
                      placeholder="g"
                      value={row.unit ?? ""}
                      onChange={(e) => updateRow(idx, { unit: e.target.value })}
                    />
                  </div>

                  <div className="flex-1 min-w-[120px]">
                    <label className="mb-1 block text-sm font-medium text-neutral-800">Zusatz</label>
                    <input
                      className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-[15px] text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-300 focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2"
                      placeholder="optional"
                      value={row.additional_info ?? ""}
                      onChange={(e) => updateRow(idx, { additional_info: e.target.value })}
                    />
                  </div>

                  <button
                    type="button"
                    aria-label="Zutat entfernen"
                    onClick={() => removeRow(idx)}
                    className="h-10 w-10 shrink-0 rounded-xl border border-neutral-300 bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <div className="flex flex-col-reverse items-stretch gap-3 border-t border-neutral-200/70 pt-4 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/recipes")}
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-neutral-700 ring-1 ring-inset ring-neutral-300 transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2">
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={state.loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFDB63] px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)] transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
              {state.loading ? "Speichern…" : "Rezept anlegen"}
            </button>
          </div>
        </form>
      </article>
    </section>
  )
}
