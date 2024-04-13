import winston from 'winston'

const buildLogger = (): winston.Logger => {
  const logger: winston.Logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'info'
      })
    ]
  })

  return logger
}

export default buildLogger
