import type { Request, Response, NextFunction } from 'express'

export class ExceptionMiddleware {
  public static handle(error: Error, req: Request, res: Response, _next: NextFunction) {
    console.log(`Error: ${error} - ${req.url}`)

    res.status(500).json({
      messsage: `We are sorry, but something went wrong!`,
    })
  }
}
