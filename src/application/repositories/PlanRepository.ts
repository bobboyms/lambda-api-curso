import {FindById} from "./generics/FindById";
import {Plan} from "../domain/entity/Plan";
import {Save} from "./generics/Save";

export interface PlanRepository extends Save<Plan>,FindById<Plan> {}