import Hero from "../../components/hero/Hero"
import { useRecipe } from "../../function/recipes"
import Card from "../../components/card/Card"
import SkeletonCard from "../../components/skeletonCard/SkeletonCard"

export default function Recipe() {
  const { state } = useRecipe()

  return (
    <div className="w-full h-full">
      <Hero />
      <section className="mx-auto px-4 py-10">
        <h2 className="mb-6 text-2xl text-center font-bold">Alle Rezepte</h2>

        {state.error && <p className="text-red-500">{state.error}</p>}

        <div className="grid justify-center gap-6 [grid-template-columns:repeat(auto-fit,minmax(250px,403px))]">
          {state.loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
            : state.recipes.map((r) => (
                <Card key={r.id} to={`/recipe/${r.id}`} title={r.name} description={r.description} />
              ))}
        </div>
      </section>
    </div>
  )
}
