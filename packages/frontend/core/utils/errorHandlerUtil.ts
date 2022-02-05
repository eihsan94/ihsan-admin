export const throwHttpError = (err: any) => {
    const error = handleHttpError(err)
    throw error
}

export const handleHttpError = (err: any) => {
    const { status, data } = err.response
    const { message } = data
    const error = { status, message }
    return error
}