export type Order = {
  userId: string
  date: Date
  products: {
    productId: string
    quantity: number
  }[]
  total: number
}

export type OrderEvent = {
  userId: string
  date: Date
  products: {
    productId: string
    quantity: number
  }[]
  total: number
  type: 'order.created' | 'order.updated' | 'order.deleted'
}
