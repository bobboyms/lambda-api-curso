import {Name} from "../valueobjects/Name";
import {ID} from "../valueobjects/ID";
import {Address} from "../valueobjects/Address";

export class Customer {

    public readonly id:ID
    public readonly name:Name
    public readonly address:Address

    constructor(id:ID,name:Name, address:Address) {
        this.id = id
        this.name = name
        this.address = address
    }

}