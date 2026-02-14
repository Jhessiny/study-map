export class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isError(): this is Left<L, R> {
    return true
  }

  isSuccess(): this is Right<L, R> {
    return false
  }
}

export class Right<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isError(): this is Left<L, R> {
    return false
  }

  isSuccess(): this is Right<L, R> {
    return true
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>

export const error = <L, R>(value: L): Either<L, R> => new Left(value)
export const success = <L, R>(value: R): Either<L, R> => new Right(value)
