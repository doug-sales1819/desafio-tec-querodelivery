import { Router } from 'express'
import { OrderController } from '../controllers/order.controller'
import { OrderService } from '../services/order.service'
import { OrderModel } from '../infra/database/models/order.model'
import { CartModel } from '../infra/database/models/cart.model'

const router = Router()
const orderService = new OrderService(CartModel, OrderModel)
const orderController = new OrderController(orderService)

router.post('/', orderController.createOrder.bind(orderController))

export { router as OrderRouter }
