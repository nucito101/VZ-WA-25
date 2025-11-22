import supabase from "../utils/supabase"

export type Profile = {
  id: string
  email: string
  username: string
  first_name: string
  last_name: string
  created_at: string
  avatar_url?: string
}

export type Recipe = {
  id: string
  name: string
  description: string
  created_at: string
}

export async function getAuthUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  return data.user
}

export async function getProfileById(userId: string): Promise<Profile> {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()
  if (error) throw error
  return data as Profile
}

export async function getCreatedCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from("user_recipes")
    .select("recipe_id", { count: "exact", head: true })
    .eq("user_id", userId)
  if (error) throw error
  return count ?? 0
}

export async function getCreatedRecipes(userId: string): Promise<Recipe[]> {
  const { data, error } = await supabase
    .from("user_recipes")
    .select(`recipe_id,recipes (id,name,description,created_at)`)
    .eq("user_id", userId)
    .order("created_at", { referencedTable: "recipes", ascending: false })
  if (error) throw error
  const list: Recipe[] = (data ?? []).map((recipe: any) => recipe.recipes).filter(Boolean) || []
  return list
}

export async function updateProfile(userId: string, patch: Partial<Profile>) {
  const { error } = await supabase.from("profiles").update(patch).eq("id", userId)
  if (error) throw error
}
