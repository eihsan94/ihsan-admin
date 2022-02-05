import { throwHttpError } from "./errorHandlerUtil"

export const fetcherUtil = async<T>(fn: any) => {
    return fn
        .then((data: T) => data)
        .catch((err: any) => throwHttpError(err))
}
