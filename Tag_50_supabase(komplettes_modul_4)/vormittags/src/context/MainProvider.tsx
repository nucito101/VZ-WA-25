import { createContext, useEffect, useState } from "react"
import type { IProduct } from "../interfaces/IProduct"
import { getProdut_Store } from "../functions/getProducts"
import { getCart, getCategory, getProductANDCategory } from "../functions/getProducts_v2"

export interface MainContextProps {
  products: IProduct[]
}

export const maincontext = createContext<MainContextProps | null>(null)

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const getData_In_useeffect = async () => {
      try {
        const products_Variable_von_der_function = await getProdut_Store()
        const products_category_von_der_function = await getProductANDCategory()
        await getCart()
        await getCategory()
        setProducts(products_Variable_von_der_function)
        console.log(products_category_von_der_function)
      } catch (err) {
        console.error(err)
      }
    }
    getData_In_useeffect()
  }, [])

  return <maincontext.Provider value={{ products }}>{children}</maincontext.Provider>
}
