import {Subscription} from "../../domain/agregates/Subscription";

export interface FindSubscription {
    subscriptionFindById(subscriptionId:string):Promise<Subscription>
}