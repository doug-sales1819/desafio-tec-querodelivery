import 'express-async-errors'

import { default as express, json, urlencoded, Application } from 'express'
import { default as cors, CorsOptions } from 'cors'
import { default as swaggerUi } from 'swagger-ui-express'
import { default as swaggerJsdoc } from 'swagger-jsdoc'
import { specs } from './config/swagger-docs.config'
import { ExceptionMiddleware } from './middlewares/exception.middleware'

import { ProductRouter } from './routes/product.router'
import { CartRouter } from './routes/cart.router'
import { UserRouter } from './routes/user.router'
import { OrderRouter } from './routes/order.router'
import { StatisticsRouter } from './routes/statistics.router'

interface ServerConfigOptions {
  cors?: CorsOptions
}

export class ExpressServer {
  private app: Application

  constructor(private readonly serverConfig?: ServerConfigOptions) {
    this.app = express()
    this.setupMiddlewares()
    this.setupRoutes()
    this.setupErrorHandlers()
  }

  private setupMiddlewares(): void {
    this.app.use(json())
    this.app.use(urlencoded({ extended: true }))
    this.app.use(cors(Object.assign({ origin: '*' }, this.serverConfig?.cors)))
  }

  private setupRoutes(): void {
    this.app.use('/produtos', ProductRouter)
    this.app.use('/carrinho', CartRouter)
    this.app.use('/usuarios', UserRouter)
    this.app.use('/pedidos', OrderRouter)
    this.app.use('/estatisticas', StatisticsRouter)
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(specs), { explorer: true }))
  }

  private setupErrorHandlers(): void {
    this.app.use(ExceptionMiddleware.handle)
  }

  public listen(port: number, callback?: () => void): void {
    this.app.listen(port, callback)
  }
}
