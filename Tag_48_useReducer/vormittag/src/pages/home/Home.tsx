import { useProducts } from "../../function/Functions"
import type { IProduct } from "../../interfaces/Interfaces"

export default function Home() {
  const { states } = useProducts()

  if (states.error) {
    return (
      <>
        <p>ERROR IST DAA</p>
      </>
    )
  }

  if (states.loading) {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }

  return (
    <>
      <h2>Products</h2>
      {states.products.map((product: IProduct) => {
        return (
          <>
            <p>Title {product.title}</p>
            <p>Price{product.price}</p>
          </>
        )
      })}
    </>
  )
}
