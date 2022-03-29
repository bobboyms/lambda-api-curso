import {Customer} from "../entity/Customer";
import {Plan} from "../entity/Plan";

export class Subscription {

    public readonly customer:Customer
    public readonly plan:Plan
    public readonly dateTime:Date

    private constructor(customer:Customer, plan:Plan, dateTime:Date) {
        this.customer = customer
        this.plan = plan
        this.dateTime = dateTime
    }

    public static create(customer:Customer, plan:Plan):Subscription {
        return new Subscription(
            customer,
            plan,
            new Date()
        )
    }

}