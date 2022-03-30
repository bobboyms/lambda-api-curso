import {Customer} from "../entity/Customer";
import {Plan} from "../entity/Plan";
import {ID} from "../valueobjects/ID";

export class Subscription {

    public readonly id:ID
    public readonly customer:Customer
    public readonly plan:Plan
    public readonly dateTime:Date
    private _unsubscribe:boolean

    private constructor(id:ID, customer:Customer, plan:Plan, dateTime:Date) {
        this.id = id
        this.customer = customer
        this.plan = plan
        this.dateTime = dateTime
        this._unsubscribe = false
    }

    public unsubscribe():Subscription {
        this._unsubscribe = true
        return this
    }

    public static create(customer:Customer, plan:Plan):Subscription {
        return new Subscription(
            ID.newId(),
            customer,
            plan,
            new Date()
        )
    }

}