import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Types } from 'mongoose'
import { CartModel } from '../infra/database/models/cart.model'

export class CartService {
  constructor(private readonly cartModel: typeof CartModel) {}

  public async createItem({
    userId,
    productId,
    quantity,
  }: {
    userId: string
    productId: string
    quantity: number
  }): Promise<any> {
    const updateResult = await this.cartModel.updateOne(
      {
        userId: new Types.ObjectId(userId),
        'items.productId': new Types.ObjectId(productId),
      },
      {
        $inc: {
          'items.$.quantity': quantity,
        },
      },
    )

    if (!updateResult.matchedCount) {
      await this.cartModel.updateOne(
        { userId: new Types.ObjectId(userId) },
        {
          $setOnInsert: { userId: new Types.ObjectId(userId) },
          $push: {
            items: {
              productId: new Types.ObjectId(productId),
              quantity,
            },
          },
        },
        { upsert: true },
      )
    }

    return {
      statusCode: StatusCodes.CREATED,
      statusText: ReasonPhrases.CREATED,
      data: {
        message: 'Item added to cart',
      },
    }
  }

  public async removeItem(userId: string, itemId: string): Promise<any> {
    const removeResult = await this.cartModel.updateOne(
      {
        userId: new Types.ObjectId(userId),
        'items._id': new Types.ObjectId(itemId),
      },
      {
        $pull: { items: { _id: new Types.ObjectId(itemId) } },
      },
    )

    if (!removeResult.modifiedCount) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        statusText: ReasonPhrases.NOT_FOUND,
        data: {
          message: 'Item not found in cart',
        },
      }
    }

    return {
      statusCode: StatusCodes.OK,
      statusText: ReasonPhrases.OK,
      data: {
        message: 'Item removed from cart',
      },
    }
  }

  public async updateItem(userId: string, itemId: string, quantity: number): Promise<any> {
    const updateResult = await this.cartModel.updateOne(
      {
        userId: new Types.ObjectId(userId),
        'items._id': new Types.ObjectId(itemId),
      },
      {
        $set: { 'items.$.quantity': quantity },
      },
    )

    if (!updateResult.matchedCount) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        statusText: ReasonPhrases.NOT_FOUND,
        data: {
          message: 'Item not found in cart',
        },
      }
    }

    return {
      statusCode: StatusCodes.OK,
      statusText: ReasonPhrases.OK,
      data: {
        message: 'Item updated',
      },
    }
  }

  public async findByUserId(userId: string): Promise<{
    statusCode: number
    statusText: string
    data: any
  }> {
    const cartItems = await this.cartModel.aggregate([
      {
        $match: { userId: new Types.ObjectId(userId) },
      },
      {
        $unwind: '$items',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      {
        $unwind: '$productDetails',
      },
      {
        $project: {
          cartId: '$_id',
          userId: 1,
          createdAt: 1,
          updatedAt: 1,
          items: {
            cartItemId: '$items._id',
            quantity: '$items.quantity',
            name: '$productDetails.name',
            description: '$productDetails.description',
            price: '$productDetails.price',
          },
        },
      },
      {
        $group: {
          _id: '$_id',
          userId: { $first: '$userId' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          items: { $push: '$items' },
        },
      },
    ])

    return {
      statusCode: StatusCodes.OK,
      statusText: ReasonPhrases.OK,
      data: cartItems[0] ?? [],
    }
  }
}
