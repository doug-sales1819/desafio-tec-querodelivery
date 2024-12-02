import { ExpressServer } from '@/server'
import { Database } from './infra/database'
import { RabbitMQ } from './infra/message-broker/rabbitmq'
import { OrderCreatedConsumer } from './infra/message-broker/consumers/order.consumer'
import { fakeProduct } from './utils/fake-data'
import { ProductModel } from './infra/database/models/product.model'
import { env } from './config/env.config'

async function boostrap(): Promise<void> {
  try {
    const database = new Database({ dbName: 'querodb' })
    const messageBroker = new RabbitMQ()
    const server = new ExpressServer({
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
      },
    })

    await Promise.all([database.connect(), messageBroker.connect()])
    await Promise.all([database.seedData(ProductModel, Array.from({ length: 10 }, fakeProduct))])

    await messageBroker.registerConsumers([new OrderCreatedConsumer()])

    server.listen(env.server.port, () => {
      console.log(`Server running on port ${env.server.port}`)
    })
  } catch (err: any) {
    console.log(`Error starting server: ${err}`)
    process.exit(1)
  }
}

boostrap()
