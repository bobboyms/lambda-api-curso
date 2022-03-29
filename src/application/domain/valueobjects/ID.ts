import { v4 as uuid4 } from 'uuid';
import {ValidationException} from "../../exceptions/ValidationException";

export class ID {

    private readonly id:string

    constructor(id:string) {

        if (id.trim().length == 0) {
            throw new ValidationException("Inválid ID")
        }

        this.id = id
    }


    public get value():string {
        return this.id
    }

    static newId():ID {
        return new ID(uuid4())
    }

}