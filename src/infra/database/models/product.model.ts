import { model } from 'mongoose'
import { ProductDocument, ProductSchema } from '../schemas/product.schema'

export const ProductModel = model<ProductDocument>('products', ProductSchema)
