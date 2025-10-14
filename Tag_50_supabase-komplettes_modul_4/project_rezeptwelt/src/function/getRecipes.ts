import { useContext } from "react"
import { mainContext } from "../context/MainProvider"
import type { ICategory, IIngredient, IRecipe } from "../interfaces/interface"
import supabase from "../utils/supabase"

export const useRecipe = () => {
  const ctx = useContext(mainContext)
  if (!ctx) throw new Error("useContext funktioniert nicht")
  return ctx
}

export async function getCategories(): Promise<ICategory[]> {
  const { data, error } = await supabase.from("categories").select("*").order("created_at", { ascending: false })
  if (error) throw error
  return (data ?? []) as ICategory[]
}

export async function getRecipesByCategory(categoryId?: string): Promise<(IRecipe & { ingredients: IIngredient[] })[]> {
  let query = supabase.from("recipes").select(`*, ingredients(*)`).order("created_at", { ascending: false })
  if (categoryId && categoryId.trim()) query = query.eq("category_id", categoryId)
  const { data, error } = await query
  if (error) throw error
  return (data ?? []) as (IRecipe & { ingredients: IIngredient[] })[]
}

export async function getRecipeWithIngredients(id: string): Promise<IRecipe & { ingredients: IIngredient[] }> {
  const { data, error } = await supabase.from("recipes").select(`*, ingredients(*)`).eq("id", id).single()
  if (error) throw error
  return data as unknown as IRecipe & { ingredients: IIngredient[] }
}

export async function getAllRecipes(): Promise<(IRecipe & { ingredients: IIngredient[] })[]> {
  const { data, error } = await supabase.from("recipes").select(`*, ingredients(*)`).order("name", { ascending: true })

  if (error) throw error
  return (data ?? []) as (IRecipe & { ingredients: IIngredient[] })[]
}
