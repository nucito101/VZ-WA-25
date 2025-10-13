import { useNavigate } from "react-router"
import type { IProduct } from "../../interfaces/IProduct"
import { addCart } from "../../functions/addCart"

type ProductItemProps = {
  product: IProduct
}

export default function ProductItem({ product }: ProductItemProps) {
  const navigate = useNavigate()

  const handleToCart = async () => {
    navigate("/cart")
    await addCart(product.id)
  }
  return (
    <div>
      <p>Title: {product?.title}</p>
      <p>Price: {product?.price}</p>
      <p>Quality: {product?.quality}</p>
      <button onClick={handleToCart}>Add to Cart</button>
    </div>
  )
}
