import {ValidationException} from "../../exceptions/ValidationException";

export class Address {
    public readonly streetName:string
    public readonly number:string
    public readonly city:string

    constructor(streetName:string, number:string, city:string) {

        if (streetName.trim().length == 0) {
            throw new ValidationException("Invalid street name")
        }

        if (number.trim().length == 0) {
            throw new ValidationException("Invalid address number")
        }

        if (city.trim().length == 0) {
            throw new ValidationException("Invalid address city")
        }

        this.streetName = streetName
        this.number = number
        this.city = city
    }

    public static empty():Address {
        return new Address(
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED"
        )
    }

}