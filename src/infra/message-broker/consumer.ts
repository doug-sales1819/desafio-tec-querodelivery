import { Channel, ConsumeMessage } from 'amqplib'

export abstract class Consumer {
  constructor(protected readonly queue: string) {}

  abstract worker(
    msg: ConsumeMessage | null,
    handlers: {
      confirmMsg: (options?: { allUpTo?: boolean }) => void
      rejectMsg: (options?: { allUpTo?: boolean; requeue?: boolean }) => void
    },
  ): void

  public async init(channel: Channel): Promise<void> {
    await channel.assertQueue(this.queue, { durable: true })

    await channel.consume(this.queue, (msg) => {
      const confirmMsg = (options?: { allUpTo?: boolean }) => {
        if (msg) {
          channel.ack(msg, options?.allUpTo || false)
        }
      }

      const rejectMsg = (options?: { allUpTo?: boolean; requeue?: boolean }) => {
        if (msg) {
          channel.nack(msg, options?.allUpTo || false, options?.requeue || false)
        }
      }

      try {
        this.worker(msg, { confirmMsg, rejectMsg })
      } catch (error) {
        console.error(`Error in worker for queue ${this.queue}:`, error)
        rejectMsg({ requeue: true })
      }
    })

    console.log(`Consumer initialized for queue: ${this.queue}`)
  }
}
