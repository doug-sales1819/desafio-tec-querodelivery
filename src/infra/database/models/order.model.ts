import { model } from 'mongoose'
import { OrderDocument, OrderSchema } from '../schemas/order.schema'

export const OrderModel = model<OrderDocument>('orders', OrderSchema)
