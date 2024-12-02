import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { StatisticsModel } from '../infra/database/models/statistics.model'

export class StatisticsService {
  constructor(private readonly statisticsModel: typeof StatisticsModel) {}

  public async findStatistics(userId: string) {
    const statistics = await this.statisticsModel.findOne({ userId }).exec()

    return {
      statusCode: statistics ? StatusCodes.OK : StatusCodes.NOT_FOUND,
      statusText: statistics ? ReasonPhrases.OK : ReasonPhrases.NOT_FOUND,
      data: statistics,
    }
  }
}
