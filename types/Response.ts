export type Response = {
  status: number
  message: string
}

export type ResponseList = Response & {
  data: {
    number: number
    size: number
    totalPages: number
    totalElements: number
  }
}
