import {FindById} from "./generics/FindById";
import {Save} from "./generics/Save";
import {Subscription} from "../domain/agregates/Subscription";
import {Update} from "./generics/Update";

export interface SubscriptionRepository extends Save<Subscription>,FindById<Subscription>, Update<Subscription>{}