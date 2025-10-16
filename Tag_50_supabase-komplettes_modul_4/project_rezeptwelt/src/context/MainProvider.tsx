import { createContext, useEffect, useReducer, useState } from "react"
import { reducer } from "../function/reducer"
import { initialState, type IState, type TAction } from "../interfaces/interface"
import { useLocation, useParams } from "react-router"
import { getAllRecipes, getCategories, getRecipesByCategory, getRecipeWithIngredients } from "../function/getRecipes"
import type { User } from "@supabase/supabase-js"
import supabase from "../utils/supabase"

export interface MainContextProps {
  state: IState
  dispatch: React.Dispatch<TAction>
  user: User | null
  authChecked: boolean
  linkRecipeToUser: (recipeId: string) => Promise<void>
}

export const mainContext = createContext<MainContextProps | null>(null)

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [user, setUser] = useState<User | null>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const location = useLocation()
  const params = useParams()

  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error("Fehler beim Abrufen der Session:", error.message)
      }
      setUser(data.session?.user ?? null)
      setAuthChecked(true)
    }
    loadUser()
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const linkRecipeToUser = async (recipeId: string) => {
    if (!user) throw new Error("Nicht eingeloggt")
    const { error } = await supabase.from("user_recipes").insert({ user_id: user.id, recipe_id: recipeId })
    if (error) throw error
  }

  useEffect(() => {
    const path = location.pathname

    if (path === "/") {
      if (!state.cache.categoriesLoaded) {
        dispatch({ type: "FETCH_START" })
        getCategories()
          .then((data) => dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: data }))
          .catch((e) => dispatch({ type: "FETCH_ERROR", payload: e.message }))
      }
      return
    }

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

    if (path === "/recipes") {
      dispatch({ type: "FETCH_START" })
      getAllRecipes()
        .then((data) => dispatch({ type: "FETCH_RECIPES_SUCCESS", payload: data }))
        .catch((e) => dispatch({ type: "FETCH_ERROR", payload: e.message }))
    }

    if (path === "/recipe/new") {
      if (!state.cache.categoriesLoaded) {
        dispatch({ type: "FETCH_START" })
        getCategories()
          .then((data) => dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: data }))
          .catch((e) => dispatch({ type: "FETCH_ERROR", payload: e.message }))
      }
      return
    }
  }, [location.pathname, params])

  return (
    <mainContext.Provider value={{ state, dispatch, user, authChecked, linkRecipeToUser }}>
      {children}
    </mainContext.Provider>
  )
}
