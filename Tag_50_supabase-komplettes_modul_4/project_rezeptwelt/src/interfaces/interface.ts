import type { Profile } from "../function/getProfile"

export interface ICategory {
  id: string
  name: string
  created_at: string
}

export interface IRecipe {
  id: string
  name: string
  description: string
  servings: number
  instructions: string
  category_id: string
  created_at: string
}

export interface IIngredient {
  id: string
  recipe_id: string
  name: string
  quantity?: number | null
  unit?: string | null
  additional_info?: string | null
  created_at: string
}

export interface IState {
  categories: ICategory[]
  recipes: IRecipe[]
  selectedRecipe: IRecipe | null
  ingredients: IIngredient[]
  categoryName: string | null
  cache: {
    categoriesLoaded: boolean
    recipesLoaded: boolean
    recipeDetail: Record<string, { recipe: IRecipe; ingredients: IIngredient[] }>
  }
  loading: boolean
  error: string | null
  userId: string | null
  profile: Profile | null
  authChecked: boolean
  loadingProfile: boolean
}

export type TAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_CATEGORIES_SUCCESS"; payload: ICategory[] }
  | { type: "FETCH_RECIPES_SUCCESS"; payload: IRecipe[]; categoryName?: string | null }
  | { type: "FETCH_DETAIL_SUCCESS"; payload: { recipe: IRecipe; ingredients: IIngredient[] } }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "CREATE_RECIPE_START" }
  | { type: "CREATE_RECIPE_SUCCESS"; payload: { recipe: IRecipe; ingredients: IIngredient[] } }
  | { type: "CREATE_RECIPE_ERROR"; payload: string }
  | { type: "AUTH_SET_USER"; userId: string | null }
  | { type: "AUTH_CHECKED" }
  | { type: "PROFILE_LOADING" }
  | { type: "PROFILE_SET"; profile: Profile | null }
  | { type: "PROFILE_ERROR"; error: string }

export const initialState: IState = {
  categories: [],
  recipes: [],
  selectedRecipe: null,
  ingredients: [],
  categoryName: null,
  cache: {
    categoriesLoaded: false,
    recipesLoaded: false,
    recipeDetail: {},
  },
  loading: false,
  error: null,
  userId: null,
  profile: null,
  authChecked: false,
  loadingProfile: true,
}
