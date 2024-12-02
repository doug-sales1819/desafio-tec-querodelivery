export type User = {
  fullName: string
  email: string
}

export type UserResponse<T> = {
  statusCode: number
  statusText: string
  data: T | Array<T>
}
