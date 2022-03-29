export interface Save<T> {
    save(object:T):Promise<T>
}