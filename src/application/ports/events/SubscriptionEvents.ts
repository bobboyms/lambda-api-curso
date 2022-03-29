import {Subscription} from "../../domain/agregates/Subscription";

export interface SubscriptionEvents {
    subscriptionCreated(subscription:Subscription):void
}