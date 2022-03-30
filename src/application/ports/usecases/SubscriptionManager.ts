import {Subscription} from "../../domain/agregates/Subscription";

export interface SubscriptionManager {
    createNewSubscription(customerId:string, planId:string):Promise<Subscription>
    unsubscribe(subscriptionId:string):Promise<void>
}