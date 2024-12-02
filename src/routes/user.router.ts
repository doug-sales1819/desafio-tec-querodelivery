import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { UserService } from '../services/user.service'
import { UserModel } from '../infra/database/models/user.model'

const router = Router()
const userService = new UserService(UserModel)
const userController = new UserController(userService)

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro no servidor.
 */
router.get('/', userController.findUser.bind(userController))

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: Nome completo do usuário.
 *               email:
 *                 type: string
 *                 description: Email do usuário.
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos.
 *       500:
 *         description: Erro no servidor.
 */
router.post('/', userController.createUser.bind(userController))

export { router as UserRouter }
