import { FAILURE_MESSAGE, Result } from './dto';

class SuccessOrErrorHandler {
    static handle<T>(it: Result<T, FAILURE_MESSAGE>) {
        if(it.isSuccessful) {
            return Result.success(true);
        }

        //TODO create one format for all errors
        //The problem is on BE side
        if(typeof it.error?.message !== 'string') {
            return Result.failure({
                status: 400,
                message: Object.keys(it.error?.message || {}).reduce((acc, key) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const message = `[name]: ${key}, [error message]: ${it.error?.message[key]}`;

                    return acc ? `${acc} \n ${message}` : message;
                }, '')
            } as FAILURE_MESSAGE);
        }

        return Result.failure(it.error);
    }
}

export { SuccessOrErrorHandler };
