import type { Request, Response } from 'express'
import type { OrderService } from '../services/order.service'

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  public async createOrder(req: Request, res: Response) {
    const { userId, cartId } = req.body
    const { statusCode, statusText, data } = await this.orderService.createOrder(userId, cartId)
    res.statusMessage = statusText
    res.status(statusCode).json(data)
  }
}
