import { Response } from 'express'

export interface HttpError extends Error {
}

export const httpError = (res: Response, code: 200 | 500 | 422 | 401, message: string) => {
    const error = new Error(message)
    return res.status(code).send(error)
}