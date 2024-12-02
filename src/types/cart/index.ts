import { Types } from 'mongoose'
import { Product } from '../product'

export type Cart = {
  userId: string
  items: Array<{
    productId: Types.ObjectId
    quantity: number
  }>
  total: number
}

export type CartItem = Array<
  Product & {
    quantity: number
  }
>
