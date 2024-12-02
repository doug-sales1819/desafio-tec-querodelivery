import type { Request, Response } from 'express'
import type { UserService } from '../services/user.service'

export class UserController {
  constructor(private readonly userService: UserService) {}

  public async findUser(_req: Request, res: Response) {
    const { statusCode, statusText, data } = await this.userService.findAll()
    res.statusMessage = statusText
    res.status(statusCode).json(data)
  }

  public async createUser(req: Request, res: Response) {
    const { statusCode, statusText, data } = await this.userService.create(req.body)
    res.statusMessage = statusText
    res.status(statusCode).json(data)
  }
}
