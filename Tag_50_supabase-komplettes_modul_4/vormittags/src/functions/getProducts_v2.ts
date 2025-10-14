import type { ICart } from "../interfaces/ICart"
import type { ICategory } from "../interfaces/Icategory"
import type { IProduct } from "../interfaces/IProduct"
import supabase from "../utils/supabase"

// = Produkten + Kategorien

// SELECT
//   products.id,
//   products.title,
//   products.price,
//   categories.category_name
// FROM
//   products
//   JOIN categories ON categories.id = products.category_id;

export async function getProductANDCategory(): Promise<IProduct[]> {
  const { data, error } = await supabase.from("products").select(`
    id,
    title,
    price,
    quality,
    category: categories(category_name)
    `)

  if (error) {
    console.error(error)
  }
  return data as IProduct[]
}

// cart_items mit Produkten + Kategorien
export async function getCart(): Promise<ICart> {
  const { data: cart, error } = await supabase.from("cart_items").select(`
    id,
    cart_id,
    quantity,
    products: products(
    id,
    title,
    price,
    quality,
    category: categories(category_name)
    )
    `)

  if (error) {
    console.error(error)
  }

  return cart as unknown as ICart
}

export async function getCategory(): Promise<ICategory> {
  const { data: category, error } = await supabase.from("categories").select(`
    category_name,
    id,
    products: products(*)
    `)

  if (error) {
    console.error(error)
  }
  return category as unknown as ICategory
}
