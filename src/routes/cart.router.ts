import { Router } from 'express'
import { CartController } from '../controllers/cart.controller'
import { CartService } from '../services/cart.service'
import { CartModel } from '../infra/database/models/cart.model'

const router = Router()
const cartService = new CartService(CartModel)
const cartController = new CartController(cartService)

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ID do usuário.
 *         productId:
 *           type: string
 *           description: ID do produto.
 *         quantity:
 *           type: integer
 *           description: Quantidade do produto.
 *           example: 1
 * /carrinho/{id}:
 *   get:
 *     summary: Busca os itens do carrinho de um usuário.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário.
 *     responses:
 *       200:
 *         description: Lista de itens do carrinho.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       404:
 *         description: Carrinho não encontrado.
 */
router.get('/:id', cartController.findByUserId.bind(cartController))

/**
 * @swagger
 * /carrinho:
 *   post:
 *     summary: Adiciona um item ao carrinho.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       201:
 *         description: Item adicionado com sucesso.
 *       400:
 *         description: Dados inválidos.
 */
router.post('/', cartController.createItem.bind(cartController))

/**
 * @swagger
 * /carrinho:
 *   put:
 *     summary: Atualiza um item no carrinho.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso.
 *       404:
 *         description: Item não encontrado.
 */
router.put('/', cartController.updateItem.bind(cartController))

/**
 * @swagger
 * /carrinho:
 *   delete:
 *     summary: Remove um item do carrinho.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item removido com sucesso.
 *       404:
 *         description: Item não encontrado.
 */
router.delete('/', cartController.removeItem.bind(cartController))

export { router as CartRouter }
