import { Schema, Document } from 'mongoose'
import { Product } from '../../../types/product'

export type ProductDocument = Document & Product

export const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: 'products',
    versionKey: false,
  },
)
