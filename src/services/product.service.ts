import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Types } from 'mongoose'
import { ProductModel } from '../infra/database/models/product.model'
import { Product } from '../types/product'

export class ProductService {
  constructor(private readonly productModel: typeof ProductModel) {}

  public async findAll(): Promise<{
    statusCode: number
    statusText: string
    data: {
      results: Product[]
      total: number
    }
  }> {
    const [productsLength, products] = await Promise.all([
      this.productModel.countDocuments(),
      this.productModel.find().lean(),
    ])

    return {
      statusCode: StatusCodes.OK,
      statusText: ReasonPhrases.OK,
      data: {
        results: products,
        total: productsLength,
      },
    }
  }

  public async findById(
    id: string,
  ): Promise<{ statusCode: number; statusText: string; data: Product | null }> {
    const product = await this.productModel.findById(new Types.ObjectId(id)).lean()

    return {
      statusCode: StatusCodes.OK,
      statusText: ReasonPhrases.OK,
      data: product,
    }
  }
}
