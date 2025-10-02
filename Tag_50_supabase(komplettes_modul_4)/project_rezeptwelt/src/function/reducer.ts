import type { IState, TAction } from "../interfaces/interface"

export function reducer(state: IState, action: TAction): IState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null }

    case "FETCH_CATEGORIES_SUCCESS":
      return { ...state, loading: false, categories: action.payload, cache: { ...state.cache, categoriesLoaded: true } }

    case "FETCH_RECIPES_SUCCESS":
      return {
        ...state,
        loading: false,
        recipes: action.payload,
        categoryName: action.categoryName ?? null,
        cache: { ...state.cache, recipesLoaded: true },
      }

    case "FETCH_DETAIL_SUCCESS":
      return {
        ...state,
        loading: false,
        selectedRecipe: action.payload.recipe,
        ingredients: action.payload.ingredients,
        cache: {
          ...state.cache,
          recipeDetail: { ...state.cache.recipeDetail, [action.payload.recipe.id]: action.payload },
        },
      }

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
