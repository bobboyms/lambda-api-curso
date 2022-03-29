import {Plan} from "../../domain/entity/Plan";

export interface FindPlan {
    findPlanById(id:string):Promise<Plan>
}