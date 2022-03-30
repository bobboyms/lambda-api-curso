export interface Update<T> {
    update(object:T):Promise<void>
}