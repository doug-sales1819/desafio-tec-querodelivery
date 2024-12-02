import { ConsumeMessage } from 'amqplib'
import { Consumer } from '../consumer'
import { OrderEvent } from '../../../types/order'
import { Types } from 'mongoose'
import { StatisticsModel } from '../../database/models/statistics.model'

export class OrderCreatedConsumer extends Consumer {
  constructor() {
    super('order.created')
  }

  public async worker(
    msg: ConsumeMessage | null,
    handlers: {
      confirmMsg: (options?: { allUpTo?: boolean }) => void
      rejectMsg: (options?: { allUpTo?: boolean; requeue?: boolean }) => void
    },
  ): Promise<void> {
    if (!msg) {
      console.warn('Received null message')
      return
    }

    try {
      const data = JSON.parse(msg.content.toString()) as OrderEvent

      const statistics = await StatisticsModel.findOneAndUpdate(
        { userId: data.userId },
        {
          $inc: {
            totalOrders: 1,
            totalRevenue: data.total,
          },
          $set: {
            lastUpdated: new Date(),
          },
        },
        { upsert: true, new: true },
      )

      for (const product of data.products) {
        const existingProduct = statistics.mostSoldProducts.find(
          (item) => item.productId.toString() === product.productId,
        )

        if (existingProduct) {
          existingProduct.quantity += product.quantity
        } else {
          statistics.mostSoldProducts.push({
            productId: new Types.ObjectId(product.productId),
            quantity: product.quantity,
          })
        }
      }

      await statistics.save()

      console.log(`Updated statistics for user: ${data.userId}`)

      handlers.confirmMsg()
    } catch (error) {
      console.error('Error processing message:', error)
      handlers.rejectMsg({ requeue: true })
    }
  }
}
