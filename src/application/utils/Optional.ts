export class Empty {}

export class Optional<T> {

    public readonly object:T

    public constructor(object:T) {
        this.object = object
    }

    public get isPresent():boolean {
        return !(this.object instanceof Empty)
    }

    public orElseThrow(callback: () => void):T {

        if (this.isPresent) {
            return this.object
        } else {
            callback()
        }

        throw new Error("invalid type")

    }

    static of<T>(object:T):Optional<T> {
        return new Optional(object)
    }

    static empty():Optional<Empty> {
        return new Optional<Empty>(new Empty())
    }

}