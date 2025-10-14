import type { IIngredient, IRecipe } from "../interfaces/interface"
import supabase from "../utils/supabase"

export type IngredientInput = {
  name: string
  quantity?: number | null
  unit?: string | null
  additional_info?: string | null
}

export type NewRecipe = {
  name: string
  description: string
  servings: number
  instructions: string
  category_id: string
}

export async function createRecipe(recipeData: NewRecipe): Promise<IRecipe> {
  const { data, error } = await supabase
    .from("recipes")
    .insert({
      name: recipeData.name,
      description: recipeData.description,
      servings: recipeData.servings,
      instructions: recipeData.instructions,
      category_id: recipeData.category_id,
    })
    .select("*")
    .single()

  if (error) throw error
  return data as IRecipe
}

export async function addIngredients(recipeId: string, ingredients: IngredientInput[]): Promise<IIngredient[]> {
  if (ingredients.length === 0) return []

  const cleanedIngredients = ingredients.map((ingredient) => ({
    recipe_id: recipeId,
    name: ingredient.name.trim(),
    quantity: ingredient.quantity ?? null,
    unit: ingredient.unit?.trim() || null,
    additional_info: ingredient.additional_info?.trim() || null,
  }))
  const { data, error } = await supabase.from("ingredients").insert(cleanedIngredients).select("*")
  if (error) throw error
  return (data ?? []) as IIngredient[]
}

export async function createRecipeWithIngredients(
  recipeData: NewRecipe,
  ingredientInputs: IngredientInput[]
): Promise<{ recipe: IRecipe; ingredients: IIngredient[] }> {
  let newRecipe: IRecipe | null = null

  try {
    newRecipe = await createRecipe(recipeData)

    const validIngredients = ingredientInputs
      .map((input) => ({ ...input, name: (input.name ?? "").trim() }))
      .filter((input) => input.name.length > 0)

    const addedIngredients = await addIngredients(newRecipe.id, validIngredients)

    return { recipe: newRecipe, ingredients: addedIngredients }
  } catch (error) {
    if (newRecipe?.id) {
      await supabase.from("recipes").delete().eq("id", newRecipe.id)
    }
    throw error
  }
}
