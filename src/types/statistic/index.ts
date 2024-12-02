import { Types } from 'mongoose'

export type Statistic = {
  totalOrders: number
  totalRevenue: number
  mostSoldProducts: {
    productId: Types.ObjectId
    quantity: number
  }[]
  lastUpdated: Date
}
