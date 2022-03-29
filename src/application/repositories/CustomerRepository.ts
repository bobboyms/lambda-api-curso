import {Customer} from "../domain/entity/Customer";
import {Save} from "./generics/Save";
import {FindById} from "./generics/FindById";

export interface CustomerRepository extends Save<Customer>, FindById<Customer> {}