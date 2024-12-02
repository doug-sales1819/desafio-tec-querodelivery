import { default as winston } from 'winston'

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      dirname: 'logs',
    }),
    new winston.transports.File({ filename: 'combined.log', dirname: 'logs' }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  )
}

export { logger }
