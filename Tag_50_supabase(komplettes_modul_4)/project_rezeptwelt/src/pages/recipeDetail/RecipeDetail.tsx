import Hero from "../../components/hero/Hero"
import { useRecipe } from "../../function/recipes"

export default function RecipeDetail() {
  const { state } = useRecipe()

  if (state.loading)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFDB63] border-t-transparent" />
          <p className="text-neutral-600">Rezept wird geladen...</p>
        </div>
      </div>
    )

  if (state.error) return <p className="text-red-500">{state.error}</p>
  if (!state.selectedRecipe) return <p>Kein Rezept gefunden.</p>
  return (
    <div className="w-full h-full">
      <Hero title={state.selectedRecipe.name} />

      <section className="mx-auto max-w-3xl px-4 py-10 space-y-8">
        <div>
          <p className="text-lg text-neutral-700">{state.selectedRecipe.description}</p>
        </div>

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

        <div>
          <h2 className="mb-4 text-xl font-semibold">Zubereitung</h2>
          <ol className="list-decimal list-inside space-y-1">
            {state.selectedRecipe.instructions
              ?.split(/\d+[.)]\s*/)
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
