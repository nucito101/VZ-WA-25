import { useNavigate } from "react-router"
import type { IProduct } from "../../interfaces/IProduct"
import { addCart } from "../../functions/addCart"
import { useContext } from "react"
import { maincontext } from "../../context/MainProvider"
import type { IUser } from "../../interfaces/IUser"

type ProductItemProps = {
  product: IProduct
}

export default function ProductItem({ product }: ProductItemProps) {
  const { user } = useContext(maincontext) as { user: IUser }
  const navigate = useNavigate()

  const handleToCart = async () => {
    navigate("/cart")
    await addCart(product.id, user?.id)
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col p-5">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{product.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          Price: <span className="font-medium text-gray-800 dark:text-gray-200">${product.price}</span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Quality: <span className="font-medium">{product.quality}</span>
        </p>
      </div>

      <button
        onClick={handleToCart}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200">
        Add to Cart
      </button>
    </div>
  )
}
