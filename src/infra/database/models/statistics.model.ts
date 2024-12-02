import { model } from 'mongoose'
import { StatisticsDocument, StatisticsSchema } from '../schemas/statistics.schema'

export const StatisticsModel = model<StatisticsDocument>('Statistics', StatisticsSchema)
