import { useRecipe } from "../../function/recipes"
import Card from "../../components/card/Card"
import Hero from "../../components/hero/Hero"
import SkeletonCard from "../../components/skeletonCard/SkeletonCard"

export default function RecipeList() {
  const { state } = useRecipe()

  return (
    <div className="w-full h-full">
      <Hero />

      <section className="mx-auto px-4 py-10">
        <h2 className="mb-6 text-2xl text-center font-bold">
          Rezepte für Kategorie {state.categoryName ?? "Unbekannt"}
        </h2>

        {state.error && <p className="text-red-500">{state.error}</p>}
        {state.loading ? (
          <div className="grid justify-center gap-6 [grid-template-columns:repeat(auto-fit,minmax(250px,403px))]">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))}
          </div>
        ) : state.recipes.length === 0 ? (
          <p>Keine Rezepte gefunden.</p>
        ) : (
          <div className="grid justify-center gap-6 [grid-template-columns:repeat(auto-fit,minmax(250px,403px))]">
            {state.recipes.map((r) => (
              <Card key={r.id} to={`/recipe/${r.id}`} title={r.name} description={r.description} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
