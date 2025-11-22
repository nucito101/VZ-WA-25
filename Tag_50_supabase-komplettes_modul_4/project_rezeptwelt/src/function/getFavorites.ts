import supabase from "../utils/supabase"

export type FavoriteItem = {
  id: string
  favorite_id: string
  recipe_id: string
  created_at: string
}

export type FavoriteRecipe = {
  id: string
  name: string
  description: string
  created_at: string
  image_url?: string | null
}

/** Holt die Favorites-Row für einen Nutzer */
export async function getOrCreateFavorites(userId: string) {
  let { data: fav, error } = await supabase.from("favorites").select("*").eq("user_id", userId).single()

  if (error && error.code !== "PGRST116") {
    throw error
  }

  if (!fav) {
    const { data: inserted, error: insertErr } = await supabase
      .from("favorites")
      .insert({ user_id: userId })
      .select("*")
      .single()
    if (insertErr) throw insertErr
    fav = inserted
  }

  return fav as { id: string; user_id: string; created_at: string }
}

/** Liste der Lieblings-Rezepte  */
export async function getFavoriteRecipes(userId: string): Promise<FavoriteRecipe[]> {
  const fav = await getOrCreateFavorites(userId)

  const { data, error } = await supabase
    .from("favorite_items")
    .select(`recipe_id, recipes ( id, name, description, created_at, image_url )`)
    .eq("favorite_id", fav.id)
    .order("created_at", { ascending: false })

  if (error) throw error

  const list: FavoriteRecipe[] = (data ?? []).map((row: any) => row.recipes).filter(Boolean)
  return list
}

/** Prüfen, ob ein Rezept schon als Favorit markiert ist */
export async function isFavorite(userId: string, recipeId: string): Promise<boolean> {
  const fav = await getOrCreateFavorites(userId)
  const { count, error } = await supabase
    .from("favorite_items")
    .select("id", { count: "exact", head: true })
    .eq("favorite_id", fav.id)
    .eq("recipe_id", recipeId)

  if (error) throw error
  return (count ?? 0) > 0
}

/** Rezept als Favorit speichern */
export async function addFavorite(userId: string, recipeId: string) {
  const fav = await getOrCreateFavorites(userId)
  const { error } = await supabase.from("favorite_items").insert({ favorite_id: fav.id, recipe_id: recipeId })
  if (error) throw error
}

/** Rezept aus Favoriten entfernen */
export async function removeFavorite(userId: string, recipeId: string) {
  const fav = await getOrCreateFavorites(userId)
  const { error } = await supabase.from("favorite_items").delete().eq("favorite_id", fav.id).eq("recipe_id", recipeId)
  if (error) throw error
}

/** Anzahl Favoriten */
export async function getFavoritesCount(userId: string): Promise<number> {
  const fav = await getOrCreateFavorites(userId)
  const { count, error } = await supabase
    .from("favorite_items")
    .select("id", { count: "exact", head: true })
    .eq("favorite_id", fav.id)
  if (error) throw error
  return count ?? 0
}
