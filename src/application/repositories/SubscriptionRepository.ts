import {FindById} from "./generics/FindById";
import {Save} from "./generics/Save";
import {Subscription} from "../domain/agregates/Subscription";

export interface SubscriptionRepository extends Save<Subscription>,FindById<Subscription> {}