export type FieldError = {
    error: string
    field: string
}

export type BaseResponse<D = {}> = {
    fieldsErrors: FieldError
    messages: Array<string>
    resultCode: number
    data: D
}