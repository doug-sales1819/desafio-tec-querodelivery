import { Schema, Document } from 'mongoose'
import { Cart } from '../../../types/cart'

export type CartDocument = Document & Cart

export const cartItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    quantity: { type: Number, required: true },
  },
  {
    id: false,
  },
)

export const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
    collection: 'cart',
    versionKey: false,
  },
)
