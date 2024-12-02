import { connect, Connection, Channel } from 'amqplib'
import { Consumer } from './consumer'

export class RabbitMQ {
  private connection: Connection | null = null
  private channel: Channel | null = null

  public async connect(): Promise<void> {
    if (!this.connection) {
      this.connection = await connect('amqp://localhost:5672')
      this.channel = await this.connection.createChannel()
      console.log('Connected to RabbitMQ')
    }
  }

  public async publishMessage<T>(queue: string, message: T): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not initialized. Call connect() first.')
    }

    this.channel.assertQueue(queue, { durable: true })
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true })
  }

  public async registerConsumers(consumers: Consumer[]): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not initialized. Call connect() first.')
    }

    for (const consumer of consumers) {
      await consumer.init(this.channel)
    }
  }

  public async close(): Promise<void> {
    await this.channel?.close()
    await this.connection?.close()
    console.log('RabbitMQ connection closed')
  }
}
