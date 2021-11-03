export interface Setting<T> {
    get(...args: any[]): T
}
