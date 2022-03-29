import {Customer} from "../../domain/entity/Customer";

export interface FindCustomer {
    findCustomerById(id:string):Promise<Customer>
}