import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { UserModel } from '../infra/database/models/user.model'
import { UserResponse, User } from '../types/user'

export class UserService {
  constructor(private readonly userModel: typeof UserModel) {}

  public async findAll(): Promise<UserResponse<any>> {
    const users = await this.userModel.find().lean()

    return {
      statusCode: StatusCodes.OK,
      statusText: ReasonPhrases.OK,
      data: users,
    }
  }

  public async create(user: User): Promise<UserResponse<any>> {
    const newUser = await this.userModel.create(user)

    return {
      statusCode: StatusCodes.CREATED,
      statusText: ReasonPhrases.CREATED,
      data: newUser,
    }
  }
}
