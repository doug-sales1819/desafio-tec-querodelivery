import { Router } from 'express'
import { StatisticsController } from '../controllers/statistics.controller'
import { StatisticsService } from '../services/statistics.service'
import { StatisticsModel } from '../infra/database/models/statistics.model'

const router = Router()
const statisticsService = new StatisticsService(StatisticsModel)
const pstatisticsController = new StatisticsController(statisticsService)

router.get('/', pstatisticsController.findStatistics.bind(pstatisticsController))

export { router as StatisticsRouter }
