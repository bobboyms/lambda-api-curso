import {ID} from "../valueobjects/ID";
import {Price} from "../valueobjects/Price";
import {Name} from "../valueobjects/Name";

export class Plan {

    public readonly id:ID
    public readonly name:Name
    private _price:Price

    constructor(id:ID, name:Name, price:Price) {
        this.id = id
        this.name = name
        this._price = price
    }

    public changePrice(price:number):void {
        this._price = new Price(price)
    }

    public get price():Price {
        return this._price
    }

}