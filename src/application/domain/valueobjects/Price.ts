import {ValidationException} from "../../exceptions/ValidationException";

export class Price {

    private readonly price:number

    constructor(price :number) {

        if (price <= 0) {
            throw new ValidationException("Invalid price")
        }

        this.price = price
    }

    public get value():number {
        return this.price
    }
}