import { createContext, useEffect, useReducer } from "react"
import { reducer } from "../function/reducer"
import { useLocation, useParams } from "react-router"
import { getAllRecipes, getCategories, getRecipesByCategory, getRecipeWithIngredients } from "../function/getRecipes"
import supabase from "../utils/supabase"
import { getProfileById, type Profile } from "../function/getProfile"
import { initialState, type IState, type TAction } from "../interfaces/interface"

export interface MainContextProps {
  state: IState
  dispatch: React.Dispatch<TAction>
  linkRecipeToUser: (recipeId: string) => Promise<void>

  userId: string | null
  profile: Profile | null
  authChecked: boolean
  loadingProfile: boolean
  refreshProfile: () => Promise<void>
}

export const mainContext = createContext<MainContextProps | null>(null)

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const location = useLocation()
  const params = useParams()

  const refreshProfile = async () => {
    try {
      dispatch({ type: "PROFILE_LOADING" })

      const { data, error } = await supabase.auth.getSession()
      if (error) {
        dispatch({ type: "PROFILE_ERROR", error: error.message })
        dispatch({ type: "AUTH_CHECKED" })
        dispatch({ type: "AUTH_SET_USER", userId: null })
        return
      }

      const userId = data.session?.user?.id ?? null
      dispatch({ type: "AUTH_SET_USER", userId })
      dispatch({ type: "AUTH_CHECKED" })

      if (!userId) {
        dispatch({ type: "PROFILE_SET", profile: null })
        return
      }

      const profile = await getProfileById(userId)
      dispatch({ type: "PROFILE_SET", profile })
    } catch (e: any) {
      dispatch({ type: "PROFILE_ERROR", error: e?.message ?? "Profil konnte nicht geladen werden" })
    }
  }

  useEffect(() => {
    refreshProfile()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const userId = session?.user?.id ?? null
      dispatch({ type: "AUTH_SET_USER", userId })

      refreshProfile()
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

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
  }, [location.pathname, params, state.cache.categoriesLoaded, state.categories, dispatch])

  const linkRecipeToUser = async (recipeId: string) => {
    const userId = state.userId
    if (!userId) throw new Error("Nicht eingeloggt")
    const { error } = await supabase.from("user_recipes").insert({ user_id: userId, recipe_id: recipeId })
    if (error) throw error
  }

  return (
    <mainContext.Provider
      value={{
        state,
        dispatch,
        linkRecipeToUser,
        userId: state.userId,
        profile: state.profile,
        authChecked: state.authChecked,
        loadingProfile: state.loadingProfile,
        refreshProfile,
      }}>
      {children}
    </mainContext.Provider>
  )
}
