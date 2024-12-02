import { model } from 'mongoose'
import { UserDocument, UserSchema } from '../schemas/user.schema'

export const UserModel = model<UserDocument>('users', UserSchema)
