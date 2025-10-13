import type { ICart } from "../interfaces/ICart"
import supabase from "../utils/supabase"

export async function getCart_V2(): Promise<ICart[] | unknown> {
  const { data: cart } = await supabase.from("cart_items").select("id,quantity,products:product_id(*)").eq("cart_id", 1)

  return cart
}
