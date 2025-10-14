import type { IProduct } from "../interfaces/IProduct"
import supabase from "../utils/supabase"

// SELECT * FROM products

export async function getProdut_Store(): Promise<IProduct[]> {
  const { data: products, error } = await supabase.from("products").select("*")

  if (error) {
    console.error(error)
  }
  return products as IProduct[]
}

// ! selectQueries filter supabase Methoden

// filtern mit eq(), lt(), gt(), like(), between(), in(), or

// 1 SQl Code
// SELECT * FROM products WHERE quality = "high"

// REACT
// const { data, error } = await supabase.from("products").select("*").eq("quality", "high")

// 1.1
// const { data: products, error } = await supabase.from("products").select("*").neq("quality", "Low")

// 2
// SELECT * FROM products WHERE quality = "High" AND price < 500

// const { data, error } = await supabase.from("products").select("*").eq("quality", "High").lt("price", 500)

// 3
// SELECT * FROM products WHERE pice >= 50 AND price <= 200
// const { data, error } = await supabase
//   .from("products")
//   .select("*")
//   .eq("quality", "High")
//   .gte("price", 50)
//   .lte("price", 200)

// 3.1
// const { data, error } = await supabase
//   .from("products")
//   .select("*")
//   .eq("quality", "High")
//   .between("price", 50, 200)

// 4
// SELECT * FROM products WHERE quality IN ("High", "Medium")
// const { data, error } = await supabase
//   .from("products")
//   .select("*")
//   .in("quality", ["High", "Medium"])

// 5
// SELECT * FROM products WHERE quality = "High" OR price < 50
// const { data, error } = await supabase
//   .from("products")
//   .select("*")
//   .or("quality.eq.High, price.lt.50")

// 6
// SELECT * FROM products WHERE price >= 50 AND quality = "High"
// const { data, error } = await supabase
//   .from("products")
//   .select("*")
//   .filter("price", "gte", 50)
//   .filter("quality", "eq", "High")

// 7
// SELECT * FROM products WHERE title LIKE "%laptop%"
// const { data, error } = await supabase
//   .from("products")
//   .select("*")
//   .ilike("title", "%laptop%")

// 8
// SELECT * FROM products WHERE title LIKE "%laptop%"
// const { data, error } = await supabase
//   .from("products")
//   .select("title, price")
//   .eq("quality", "High")

// 9
// SELECT * FROM products WHERE title LIKE "%laptop%"
// const { data, error } = await supabase
//   .from("products")
//   .select("*")
//   .textSearch("title", "Laptop | maus")
