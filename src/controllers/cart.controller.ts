import type { Request, Response } from 'express'
import type { CartService } from '../services/cart.service'

export class CartController {
  constructor(private readonly cartService: CartService) {}

  public async createItem(req: Request, res: Response) {
    const { statusCode, statusText, data } = await this.cartService.createItem(req.body)
    res.statusMessage = statusText
    res.status(statusCode).json(data)
  }

  public async removeItem(req: Request, res: Response) {
    const { userId, itemId } = req.body
    const { statusCode, statusText, data } = await this.cartService.removeItem(userId, itemId)
    res.statusMessage = statusText
    res.status(statusCode).json(data)
  }

  public async updateItem(req: Request, res: Response) {
    const { userId, itemId, quantity } = req.body
    const { statusCode, statusText, data } = await this.cartService.updateItem(userId, itemId, quantity)
    res.statusMessage = statusText
    res.status(statusCode).json(data)
  }

  public async findByUserId(req: Request, res: Response) {
    const { id } = req.params
    const { statusCode, statusText, data } = await this.cartService.findByUserId(id)
    res.statusMessage = statusText
    res.status(statusCode).json(data)
  }
}
