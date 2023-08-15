import * as express from "express";
import { CustomError } from "@shared/ports/customError";

const httpErrors = {
    INTERNAL: 'INTERNAL',
    USER_ERROR: 'USER_ERROR'
}

export const response = async (prom: Promise<any>, res: express.Response, next: express.NextFunction) => {
    try {
      const result = await prom
      res.status(200).json(result)
    } catch (error) {
      switch (error.constructor) {
        case CustomError:
          switch (error.internalName) {
            case httpErrors.INTERNAL:
              return res.status(500).json({ ...error })
            case httpErrors.USER_ERROR:
              return res.status(400).json({ ...error })
            default:
              return res.status(500).json({ ...error })
          }
        default:
          return res.status(500).json(error.message || error)
      }
    }
  }