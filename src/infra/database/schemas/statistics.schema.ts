import { Schema, Document } from 'mongoose'
import { Types } from 'mongoose'
import { Statistic } from '../../../types/statistic'

export type StatisticsDocument = Document & Statistic

export const StatisticsSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'users',
      required: true,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
    },
    mostSoldProducts: [
      {
        productId: {
          type: Types.ObjectId,
          ref: 'products',
        },
        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'statistics',
    timestamps: true,
    versionKey: false,
  },
)
