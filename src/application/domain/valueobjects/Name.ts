import {ValidationException} from "../../exceptions/ValidationException";

export class Name {

    private readonly name:string

    constructor(name:string) {

        if (name.trim().length == 0) {
            throw new ValidationException("Invalid name")
        }

        this.name = name
    }

    public get value():string {
        return this.name
    }

    public static create(name:string):Name {
        return new Name(name)
    }

}