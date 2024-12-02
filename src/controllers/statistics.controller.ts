import type { Request, Response } from 'express'
import type { StatisticsService } from '../services/statistics.service'

export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  public async findStatistics(req: Request, res: Response) {
    const { userId } = req.params
    const { statusCode, statusText, data } = await this.statisticsService.findStatistics(userId)
    res.statusMessage = statusText
    res.status(statusCode).json(data)
  }
}
