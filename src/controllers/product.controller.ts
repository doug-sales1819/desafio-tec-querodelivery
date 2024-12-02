import type { Request, Response } from 'express'
import type { ProductService } from '../services/product.service'

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  public async findAll(_req: Request, res: Response) {
    const { statusCode, statusText, data } = await this.productService.findAll()
    res.statusMessage = statusText
    res.status(statusCode).json(data)
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params as { id: string }
    const { statusCode, statusText, data } = await this.productService.findById(id)
    res.statusMessage = statusText
    res.status(statusCode).json(data)
  }
}
