import { createContext, useEffect, useReducer } from "react"
import { reducer } from "../function/reducer"
import { initialState, type IState, type TAction } from "../interfaces/interface"
import { useLocation, useParams } from "react-router"
import { getAllRecipes, getCategories, getRecipesByCategory, getRecipeWithIngredients } from "../function/recipes"

export interface MainContextProps {
  state: IState
  dispatch: React.Dispatch<TAction>
}

export const mainContext = createContext<MainContextProps | null>(null)

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const location = useLocation()
  const params = useParams()

  useEffect(() => {
    const path = location.pathname
    console.log("Aktueller Pfad:", path)
    console.log("Params:", params)

    // Home
    if (path === "/") {
      if (!state.cache.categoriesLoaded) {
        dispatch({ type: "FETCH_START" })
        getCategories()
          .then((data) => dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: data }))
          .catch((e) => dispatch({ type: "FETCH_ERROR", payload: e.message }))
      }
      return
    }

    // Kategorie-Liste
    if (path.startsWith("/recipes/category/") && params.categoryId) {
      dispatch({ type: "FETCH_START" })
      const category = state.categories.find((c) => c.id === params.categoryId)
      getRecipesByCategory(params.categoryId)
        .then((data) =>
          dispatch({
            type: "FETCH_RECIPES_SUCCESS",
            payload: data,
            categoryName: category ? category.name : null,
          })
        )
        .catch((e) => dispatch({ type: "FETCH_ERROR", payload: e.message }))
      return
    }

    // Detailseite
    if (path.startsWith("/recipe/") && params.id) {
      const cached = state.cache.recipeDetail[params.id]
      if (cached) {
        dispatch({ type: "FETCH_DETAIL_SUCCESS", payload: cached })
      } else {
        dispatch({ type: "FETCH_START" })
        getRecipeWithIngredients(params.id)
          .then((data) =>
            dispatch({
              type: "FETCH_DETAIL_SUCCESS",
              payload: { recipe: data, ingredients: data.ingredients },
            })
          )
          .catch((e) => dispatch({ type: "FETCH_ERROR", payload: e.message }))
      }
      return
    }

    // Alle Rezepte
    if (path === "/recipes") {
      dispatch({ type: "FETCH_START" })
      getAllRecipes()
        .then((data) => dispatch({ type: "FETCH_RECIPES_SUCCESS", payload: data }))
        .catch((e) => dispatch({ type: "FETCH_ERROR", payload: e.message }))
    }
  }, [location.pathname, params])

  return <mainContext.Provider value={{ state, dispatch }}>{children}</mainContext.Provider>
}
