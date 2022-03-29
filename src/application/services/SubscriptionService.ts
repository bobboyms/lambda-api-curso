import {SubscriptionRepository} from "../repositories/SubscriptionRepository";
import {FindCustomer} from "../ports/usecases/FindCustomer";
import {FindPlan} from "../ports/usecases/FindPlan";
import {Subscription} from "../domain/agregates/Subscription";
import {SubscriptionEvents} from "../ports/events/SubscriptionEvents";

export class SubscriptionService {
    private readonly subscriptionRepository:SubscriptionRepository
    private readonly subscriptionEvent:SubscriptionEvents
    private readonly findCustomer:FindCustomer
    private readonly findPlan:FindPlan

    constructor(subscriptionRepository:SubscriptionRepository, subscriptionEvent:SubscriptionEvents, findCustomer:FindCustomer, findPlan:FindPlan) {
        this.subscriptionRepository = subscriptionRepository
        this.subscriptionEvent = subscriptionEvent
        this.findCustomer = findCustomer
        this.findPlan = findPlan
    }

    public async createNewSubscription(customerId:string, planId:string):Promise<Subscription> {

        const customer = await this.findCustomer.findCustomerById(customerId)
        const plan = await this.findPlan.findPlanById(planId)

        const subscription = await this.subscriptionRepository.save(
            Subscription.create(customer, plan)
        )

        await this.subscriptionEvent.subscriptionCreated(subscription)

        return Promise.resolve(subscription)

    }

}