import { useContext, useEffect } from "react"

import type { ICart } from "../../interfaces/ICart"
import supabase from "../../utils/supabase"
import { maincontext } from "../../context/MainProvider"
import { getCart_V2 } from "../../functions/getCart_V2"
import type { IUser } from "../../interfaces/IUser"

interface ICartProps {
  user: IUser
  cart: ICart[]
  setCart: React.Dispatch<React.SetStateAction<ICart[] | null | unknown>>
}

export default function Cart() {
  const { cart, setCart, user } = useContext(maincontext) as ICartProps

  console.log(cart)

  useEffect(() => {
    const getCartData = async () => {
      const myCartResult = await getCart_V2(user.id)
      console.log(myCartResult)
      setCart(myCartResult as ICart[])
    }
    getCartData()
  }, [])

  console.log(cart)

  const removeItemFunc = async (productId: number) => {
    const { error: deleteError } = await supabase.from("cart_items").delete().eq("id", productId)
    if (deleteError) {
      console.error("Fehler beim Löschen", deleteError)
    }
    const updatedCart = await getCart_V2()
    setCart(updatedCart as ICart[])
  }

  return (
    <div>
      <h2>Warenkorb</h2>
      <div>
        {cart.map((cartItem: ICart) => {
          return (
            <div key={cartItem.id}>
              <p>Title: {cartItem.products.title}</p>
              <p>price: {cartItem.products.price}</p>
              <p>Menge: {cartItem.quantity}</p>
              <button onClick={() => removeItemFunc(cartItem.id)}>Delete Product</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
