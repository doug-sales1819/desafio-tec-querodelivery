import { Schema, Document } from 'mongoose'
import { User } from '../../../types/user'

export type UserDocument = Document & User

export const UserSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    collection: 'users',
    versionKey: false,
  },
)
