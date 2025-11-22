import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Hero from "../../components/hero/Hero"
import { useRecipe } from "../../function/getRecipes"
import supabase from "../../utils/supabase"
import DeleteRecipeButton from "../../components/deleteRecipeButton/DeleteRecipeButton"

export default function RecipeDetail() {
  const { state, userId } = useRecipe()
  const navigate = useNavigate()

  const recipe = state.selectedRecipe
  const [isOwner, setIsOwner] = useState(false)
  const [checkError, setCheckError] = useState<string | null>(null)

  // Eigentum prüfen, sobald userId + recipe.id da sind
  useEffect(() => {
    let cancelled = false

    const checkOwner = async () => {
      if (!userId || !recipe?.id) {
        setIsOwner(false)
        return
      }
      try {
        const { count, error } = await supabase
          .from("user_recipes")
          .select("id", { count: "exact", head: true })
          .eq("user_id", userId)
          .eq("recipe_id", recipe.id)

        if (error) throw error
        if (!cancelled) setIsOwner((count ?? 0) > 0)
      } catch (e: any) {
        console.error(e)
        if (!cancelled) {
          setIsOwner(false)
          setCheckError(e?.message ?? "Konnte Eigentum nicht prüfen.")
        }
      }
    }

    checkOwner()
    return () => {
      cancelled = true
    }
  }, [userId, recipe?.id])

  const handleEdit = () => {
    if (!recipe?.id) return
    navigate(`/recipe/edit/${recipe.id}`)
  }

  if (state.loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFDB63] border-t-transparent" />
          <p className="text-neutral-600">Rezept wird geladen...</p>
        </div>
      </div>
    )
  }

  if (state.error) return <p className="text-red-500">{state.error}</p>
  if (!recipe) return <p>Kein Rezept gefunden.</p>

  return (
    <div className="w-full h-full">
      <Hero title={recipe.name} />

      <section className="mx-auto max-w-3xl px-4 py-10 space-y-8">
        {/* Owner-Actions */}
        {isOwner && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50">
              Bearbeiten
            </button>

            <DeleteRecipeButton recipeId={recipe.id} onDeleted={() => navigate("/profile")} />
          </div>
        )}
        {checkError && <p className="text-sm text-red-600">{checkError}</p>}

        {/* Beschreibung */}
        <div>
          <p className="text-lg text-neutral-700">{recipe.description}</p>
        </div>

        {/* Zutaten */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Zutaten</h2>
          {state.ingredients.length === 0 ? (
            <p>Keine Zutaten angegeben.</p>
          ) : (
            <ul className="list-disc list-inside space-y-1">
              {state.ingredients.map((ing) => (
                <li key={ing.id}>
                  {ing.quantity ? `${ing.quantity} ` : ""}
                  {ing.unit ? `${ing.unit} ` : ""}
                  {ing.name}
                  {ing.additional_info ? ` (${ing.additional_info})` : ""}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Zubereitung */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Zubereitung</h2>
          <ol className="list-decimal list-inside space-y-1">
            {recipe.instructions
              ?.split(/\r?\n/)
              .filter((step) => step.trim() !== "")
              .map((step, i) => (
                <li key={i}>{step.trim()}</li>
              ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
