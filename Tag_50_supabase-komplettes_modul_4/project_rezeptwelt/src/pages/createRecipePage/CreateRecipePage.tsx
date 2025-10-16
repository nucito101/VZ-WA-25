import { useState } from "react"
import { createRecipeWithIngredients } from "../../function/createRecipe"
import { useNavigate } from "react-router"
import InputField from "../../components/inputField/InputField"
import FormCard from "../../components/formCard/FormCard"
import { useRecipe } from "../../function/getRecipes"

export default function CreateRecipePage() {
  const { state, dispatch, linkRecipeToUser } = useRecipe()
  const navigate = useNavigate()
  const [rows, setRows] = useState<number[]>([0])

  const addRow = () => setRows((p) => [...p, p.length])
  const removeRow = (i: number) => setRows((p) => p.filter((_, index) => index !== i))

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formObj = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, FormDataEntryValue>

    const recipe = {
      name: String(formObj.recipe_name ?? "").trim(),
      description: String(formObj.description ?? "").trim(),
      servings: Number(formObj.servings ?? 0),
      instructions: String(formObj.instructions ?? "").trim(),
      category_id: String(formObj.category_id ?? ""),
    }

    if (!recipe.name) return alert("Bitte einen Rezeptnamen angeben.")
    if (!recipe.category_id) return alert("Bitte eine Kategorie wählen.")
    if (!recipe.instructions) return alert("Bitte Anweisungen angeben.")
    if (recipe.servings <= 0) return alert("Portionen muss > 0 sein.")

    const ingredients = rows
      .map((index) => {
        const name = String(formObj[`ingredient_name_${index}`] ?? "").trim()
        const quantityRaw = String(formObj[`ingredient_quantity_${index}`] ?? "").trim()
        const unit = String(formObj[`ingredient_unit_${index}`] ?? "").trim()
        const additional_info = String(formObj[`ingredient_additional_${index}`] ?? "").trim()
        if (!name) return null
        return {
          name,
          quantity: quantityRaw ? Number(quantityRaw) : null,
          unit: unit || null,
          additional_info: additional_info || null,
        }
      })
      .filter(Boolean) as {
      name: string
      quantity: number | null
      unit: string | null
      additional_info: string | null
    }[]

    if (ingredients.length === 0) return alert("Bitte mindestens eine Zutat hinzufügen.")

    dispatch({ type: "CREATE_RECIPE_START" })
    try {
      const { recipe: created, ingredients: createdIngredients } = await createRecipeWithIngredients(
        recipe,
        ingredients
      )

      await linkRecipeToUser(created.id)

      dispatch({ type: "CREATE_RECIPE_SUCCESS", payload: { recipe: created, ingredients: createdIngredients } })
      navigate(`/recipe/${created.id}`)
    } catch (err: any) {
      const msg = err?.message ?? "Fehler beim Anlegen."
      dispatch({ type: "CREATE_RECIPE_ERROR", payload: msg })
    }
  }

  return (
    <section className="mx-auto flex justify-center px-4 py-10 sm:px-6">
      <FormCard
        size="l"
        title="Neues Rezept anlegen"
        subtitle="Fülle die Felder aus, um ein neues Rezept zu erstellen.">
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          {state.error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 text-center">
              {state.error}
            </div>
          )}

          {/* Grunddaten */}
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              className="sm:col-span-2"
              label="Rezeptname"
              required
              name="recipe_name"
              placeholder="z.B. Cheesecake"
            />

            <InputField label="Kategorie" required name="category_id" as="select">
              {state.categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </InputField>

            <InputField label="Portionen" required name="servings" type="number" />

            <InputField
              label="Kurzbeschreibung"
              name="description"
              className="sm:col-span-2"
              placeholder="Was macht das Rezept besonders?"
            />

            <InputField
              as="textarea"
              label="Anweisungen"
              required
              name="instructions"
              className="sm:col-span-2"
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

            {rows.map((index) => (
              <div
                key={index}
                className="flex flex-wrap items-end gap-2 rounded-xl border border-neutral-200/60 bg-neutral-50/60 p-3">
                <InputField
                  className="flex-1 min-w-[180px]"
                  label="Bezeichnung"
                  name={`ingredient_name_${index}`}
                  placeholder="z.B. Frischkäse"
                  required
                />
                <InputField
                  className="w-[100px]"
                  label="Menge"
                  name={`ingredient_quantity_${index}`}
                  type="number"
                  placeholder="500"
                  required
                />
                <InputField
                  className="w-[100px]"
                  label="Einheit"
                  name={`ingredient_unit_${index}`}
                  placeholder="g"
                  required
                />
                <InputField
                  className="flex-1 min-w-[140px]"
                  label="Zusatz"
                  name={`ingredient_additional_${index}`}
                  placeholder="optional"
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
      </FormCard>
    </section>
  )
}
