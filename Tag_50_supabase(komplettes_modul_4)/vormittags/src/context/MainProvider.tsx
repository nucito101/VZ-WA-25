import { createContext, useEffect, useState } from "react"
import type { IProduct } from "../interfaces/IProduct"
import { getProdut_Store } from "../functions/getProducts"
import { getCart, getCategory, getProductANDCategory } from "../functions/getProducts_v2"
import type { ICart } from "../interfaces/ICart"

export interface MainContextProps {
  products: IProduct[]
  cart: ICart[] | null | undefined | unknown
  setCart: React.Dispatch<React.SetStateAction<ICart[] | null | unknown>>
}

export const maincontext = createContext<MainContextProps | null>(null)

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<IProduct[]>([])
  const [cart, setCart] = useState<ICart[] | null | unknown>([])

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

  return <maincontext.Provider value={{ products, cart, setCart }}>{children}</maincontext.Provider>
}
