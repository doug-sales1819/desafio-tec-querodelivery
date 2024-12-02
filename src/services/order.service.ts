import { OrderModel } from '/infra/database/models/order.model'
import { CartModel } from '/infra/database/models/cart.model'
import { RabbitMQ } from '../infra/message-broker/rabbitmq'
import { OrderEvent } from '../types/order'
import { Types } from 'mongoose'

export class OrderService {
  constructor(
    private readonly cartModel: typeof CartModel,
    private readonly oderModel: typeof OrderModel,
  ) {}

  public async createOrder(userId: string, cartId: string) {
    const cartItems = await this.cartModel
      .aggregate([
        {
          $match: {
            _id: new Types.ObjectId(cartId),
            userId: new Types.ObjectId(userId),
          },
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
      .exec()

    if (!cartItems.length) {
      return {
        statusCode: 404,
        statusText: 'Cart not found',
        data: {
          message: 'Cart not found',
        },
      }
    }

    const messageBroker = new RabbitMQ()

    const total = cartItems[0].items.reduce(
      (acc: number, item: { quantity: number; price: number }) => acc + item.quantity * item.quantity,
      0,
    )

    await this.oderModel.create({
      userId,
      products: cartItems[0].items?.map((item: any) => ({
        productId: item.cartItemId,
        quantity: item.quantity,
      })),
      date: new Date(),
      total,
    })

    await this.cartModel.deleteOne({ _id: cartItems[0]._id }).exec()

    await messageBroker.connect()
    await messageBroker.publishMessage<OrderEvent>('order.created', {
      userId,
      date: new Date(),
      products: cartItems[0].items?.map((item: any) => ({
        productId: item.cartItemId,
        quantity: item.quantity,
      })),
      total,
      type: 'order.created',
    })

    return {
      statusCode: 201,
      statusText: 'Order created',
      data: [],
    }
  }
}
