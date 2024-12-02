import { model } from 'mongoose'
import { CartDocument, CartSchema } from '../schemas/cart.schema'

export const CartModel = model<CartDocument>('cart', CartSchema)
