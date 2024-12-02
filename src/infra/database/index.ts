import { connect, Mongoose, ConnectOptions, Model } from 'mongoose'
import { env } from '../../config/env.config'

type MongoConnectionOptions = Omit<ConnectOptions, 'auth' | 'autoIndex' | 'family'>

export class Database {
  private connection: Mongoose | null = null

  constructor(private readonly connectionString: MongoConnectionOptions) {}

  public async connect() {
    try {
      console.log('Connecting to database...')

      this.connection = await connect('mongodb://localhost:27017', {
        auth: {
          username: env.database.username,
          password: env.database.password,
        },
        autoIndex: env.environment === 'development',
        family: 4,
        ...this.connectionString,
      })

      console.log(`Connected to database "${this.connectionString.dbName}"`)
    } catch (error: any) {
      throw new Error(`Error connecting to database: ${error}`)
    }
  }

  public async disconnect() {
    try {
      if (this.connection) {
        await this.connection.disconnect()
      }
    } catch (error: any) {
      throw new Error(`Error disconnecting from database: ${error}`)
    }
  }

  public async seedData<T>(model: Model<T>, data: Array<any>): Promise<void> {
    try {
      if (!data) {
        throw new Error('No data to seed')
      }

      await model.deleteMany()
      await model.insertMany([data].flat())
    } catch (error: any) {
      throw new Error(`Error seeding data: ${error}`)
    }
  }
}
