import React, { useContext } from "react"
import { maincontext, type MainContextProps } from "../../context/MainProvider"
import type { IProduct } from "../../interfaces/IProduct"

export default function Home() {
  const { products } = useContext(maincontext) as MainContextProps

  console.log(products)
  return (
    <>
      <div>
        {products.map((product: IProduct, index: number) => {
          return (
            <div key={index}>
              <h4>title {product.title}</h4>
            </div>
          )
        })}
      </div>
    </>
  )
}
