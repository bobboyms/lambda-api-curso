import {PlanRepository} from "../repositories/PlanRepository";
import {Plan} from "../domain/entity/Plan";
import {DomainNotFoundException} from "../exceptions/DomainNotFoundException";
import {FindPlan} from "../ports/usecases/FindPlan";

export class PlanService implements FindPlan {

    private readonly planRepository:PlanRepository

    constructor(planRepository:PlanRepository) {
        this.planRepository = planRepository
    }

    public async findPlanById(id:string):Promise<Plan> {

        const plan = (await this.planRepository.findById(id)).orElseThrow(
            ()=>{
                throw new DomainNotFoundException("Plan not found")
            })

        return Promise.resolve(plan)
    }

}