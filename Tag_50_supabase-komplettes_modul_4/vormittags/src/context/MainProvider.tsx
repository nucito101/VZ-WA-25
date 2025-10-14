import { createContext, useEffect, useState } from "react"
import type { IProduct } from "../interfaces/IProduct"
import { getProdut_Store } from "../functions/getProducts"
import { getCart, getCategory } from "../functions/getProducts_v2"
import type { ICart } from "../interfaces/ICart"
import type { IUser } from "../interfaces/IUser"
import supabase from "../utils/supabase"

export interface MainContextProps {
  products: IProduct[]
  cart: ICart[] | null | undefined | unknown
  setCart: React.Dispatch<React.SetStateAction<ICart[] | null | unknown>>

  user: IUser | null
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>

  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>

  loading: boolean
}

export const maincontext = createContext<MainContextProps | null>(null)

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<IProduct[]>([])
  const [cart, setCart] = useState<ICart[] | null | unknown>([])
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [loading, setloading] = useState<boolean>(true)

  useEffect(() => {
    const getData_In_useffect = async () => {
      try {
        const products_Variable_von_der_function = await getProdut_Store()
        // const products_category_von_der_function = await getProductANDCategory()
        await getCart()
        await getCategory()
        setProducts(products_Variable_von_der_function)
      } catch (err) {
        console.error(err)
      }
    }
    getData_In_useffect()
  }, [])

  useEffect(() => {
    // ! wir holen einmalig den gespeicherten Zustand (z.b beim Reload oder einlogen)
    // supabase prüft ob im Browser eine gültige Session gespeichert ist.
    // wenn ja => liefert sie den eingelogten User zurück
    // wenn nein => User = null

    // kommuniziert mit localstorage
    const checkSession = async () => {
      setloading(true)
      const { data } = await supabase.auth.getSession()
      console.log(data)
      const session = data?.session

      if (session?.user) {
        setUser(session?.user as unknown as IUser)
        setIsLoggedIn(true)
      } else {
        setUser(null)
        setIsLoggedIn(false)
      }
      setloading(false)
    }
    checkSession()

    // kommuniziert mit Supabase
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // console.log(_event)
      // console.log(session)
      setUser((session?.user as unknown as IUser) || null)
      setIsLoggedIn(!!session?.user)
    })
    // console.log(data)

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <maincontext.Provider value={{ products, cart, setCart, user, setUser, isLoggedIn, setIsLoggedIn, loading }}>
      {children}
    </maincontext.Provider>
  )
}
