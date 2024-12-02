import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'
import { ProductService } from '../services/product.service'
import { ProductModel } from '../infra/database/models/product.model'

const router = Router()
const productService = new ProductService(ProductModel)
const productController = new ProductController(productService)

router.get('/', productController.findAll.bind(productController))
router.get('/:id', productController.findById.bind(productController))

export { router as ProductRouter }
