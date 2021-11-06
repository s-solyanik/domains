
export type SuccessfulResult<T> = {
    readonly isSuccessful: true
    readonly value: T
    readonly error: undefined
}

export type FailureResult<E> = {
    readonly isSuccessful: false
    readonly error: E
    readonly value: undefined
}

export type FAILURE_MESSAGE = {
    status: number
    message: string
}

export type Result<T, E> = SuccessfulResult<T> | FailureResult<E>

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Result {
    export function success(value?: void): SuccessfulResult<null>;
    export function success<T>(value: T): SuccessfulResult<T>;
    export function success<T>(value: T): SuccessfulResult<T> {
        return {
            isSuccessful: true,
            value: value,
            error: undefined,
        };
    }

    export function failure<E>(error: E): FailureResult<E> {
        return {
            isSuccessful: false,
            value: undefined,
            error: error,
        };
    }
}
