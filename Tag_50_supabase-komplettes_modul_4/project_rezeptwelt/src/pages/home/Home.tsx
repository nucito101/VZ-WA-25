import Hero from "../../components/hero/Hero"
import { useRecipe } from "../../function/getRecipes"
import Card from "../../components/card/Card"
import SkeletonCard from "../../components/skeletonCard/SkeletonCard"

export default function Home() {
  const { state } = useRecipe()

  return (
    <div className="w-full h-full">
      <Hero />
      <section className="mx-auto px-4 py-10">
        {state.error && <p className="text-red-600">{state.error}</p>}

        <div className="grid justify-center gap-6 [grid-template-columns:repeat(auto-fit,minmax(250px,403px))]">
          {state.loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
            : state.categories.map((c) => (
                <div key={c.id}>
                  <Card to={`/recipes/category/${c.id}`} title={c.name} cta="Zur Kategorie" />
                </div>
              ))}
        </div>
      </section>
    </div>
  )
}
