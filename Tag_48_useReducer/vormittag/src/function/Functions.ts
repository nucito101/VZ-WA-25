// Dass ist eine Konvention, dass die function immer zwei Parameter kriegt, state, action

import { useContext } from "react"
import type { IState, TAction } from "../interfaces/Interfaces"
import { mainContext } from "../context/mainProvider"

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true }
    case "FETCH_SUCESS":
      return { ...state, loading: false, products: action.payload }
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload }
  }
}

export const useProducts = () => {
  const context = useContext(mainContext)
  if (!context) throw new Error("useContest funktioniert nicht")
  return context
}
