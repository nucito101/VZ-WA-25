import type { ICategory } from "./Icategory"

export interface IProduct {
  id: number
  title: string
  price: number
  quality: string
  category: ICategory[]
}
