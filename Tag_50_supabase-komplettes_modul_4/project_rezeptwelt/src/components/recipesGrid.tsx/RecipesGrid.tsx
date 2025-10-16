import Card from "../card/Card"

export type Recipe = {
  id: string
  name: string
  description: string
  created_at: string
}

export function RecipesGrid({ recipes }: { recipes: Recipe[] }) {
  if (!recipes.length) {
    return (
      <div className="rounded-xl border bg-white p-6 text-gray-500 text-sm text-center">
        Noch keine Rezepte erstellt.
      </div>
    )
  }
  return (
    <div className="grid justify-center gap-6 [grid-template-columns:repeat(auto-fit,minmax(250px,403px))]">
      {recipes.map((recipe) => (
        <Card key={recipe.id} to={`/recipe/${recipe.id}`} title={recipe.name} description={recipe.description} />
      ))}
    </div>
  )
}
