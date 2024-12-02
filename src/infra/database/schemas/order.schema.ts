import { Schema, Document } from 'mongoose'
import { cartItemSchema } from '../schemas/cart.schema'
import { Order } from '../../../types/order'

export type OrderDocument = Document & Order

export const OrderSchema = new Schema(
  {
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    products: [cartItemSchema],
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: 'orders',
    versionKey: false,
  },
)
