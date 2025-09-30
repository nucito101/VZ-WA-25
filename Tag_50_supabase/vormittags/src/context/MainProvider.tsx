import { createContext, useEffect, useState } from "react"
import type { IProduct } from "../interfaces/IProduct"
import { getProdut_Store } from "../functions/getProducts"

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
        setProducts(products_Variable_von_der_function)
      } catch (err) {
        console.error(err)
      }
    }
    getData_In_useeffect()
  }, [])

  return <maincontext.Provider value={{ products }}>{children}</maincontext.Provider>
}
