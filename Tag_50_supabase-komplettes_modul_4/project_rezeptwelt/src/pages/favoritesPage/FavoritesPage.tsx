import { useRecipe } from "../../function/getRecipes"

export default function FavoritesPage() {
  const { profile } = useRecipe()
  return (
    <>
      <div className="w-full h-full p-5">
        <h2 className="font-bold">{profile?.first_name}'s Favorites</h2>
      </div>
    </>
  )
}
