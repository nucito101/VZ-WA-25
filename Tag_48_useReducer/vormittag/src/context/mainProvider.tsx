import { createContext, useEffect, useReducer } from "react"
import type { IState, TAction } from "../interfaces/Interfaces"
import { reducer } from "../function/Functions"
import axios from "axios"

export interface MainProviderProps {
  states: IState
  dispatch: React.Dispatch<TAction>
}

export const mainContext = createContext<MainProviderProps | undefined>(undefined)

export default function mainProvider({ children }: { children: React.ReactNode }) {
  // useReducer => ist die optimierte Version von usestate
  // useReducer besteht aus drei Sachen =>
  // states => Das aktuelle Menü von einem Restaurant (Products)
  // dispatch => Der Kellner, Die Anfragn bzw Bestellung an die Küche weiterleiten und dann das Essen zurück an den Tisch
  // reducer => ist wie Küche, da wird entschieden was genau gekocht wird

  const [states, dispatch] = useReducer(reducer, {
    products: [],
    loading: false,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_START" })
      try {
        const resp = await axios.get("https://fakestoreapi.com/products")
        dispatch({ type: "FETCH_SUCESS", payload: resp.data })
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: "Fehler beim fetchen" })
      }
    }
    fetchData()
  }, [])

  return <mainContext.Provider value={{ states, dispatch }}>{children}</mainContext.Provider>
}
