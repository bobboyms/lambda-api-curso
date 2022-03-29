import {CustomerRepository} from "../repositories/CustomerRepository";
import {Customer} from "../domain/entity/Customer";
import {ID} from "../domain/valueobjects/ID";
import {Name} from "../domain/valueobjects/Name";
import {DomainNotFoundException} from "../exceptions/DomainNotFoundException";
import {FindCustomer} from "../ports/usecases/FindCustomer";
import {Address} from "../domain/valueobjects/Address";

export class CustomerService implements FindCustomer {

    private readonly customerRepository:CustomerRepository

    constructor(customerRepository:CustomerRepository) {
        this.customerRepository = customerRepository
    }

    public async createNewCustomer(name:string):Promise<Customer> {

        const customer = await this.customerRepository.save(
            new Customer(
                ID.newId(),
                Name.create(name),
                Address.empty()
            )
        )

        return Promise.resolve(customer)
    }

    public async findCustomerById(id:string):Promise<Customer> {

        const customer = (await this.customerRepository.findById(id))
            .orElseThrow(()=> {
                throw new DomainNotFoundException("Customer not found")
            })

        return Promise.resolve(customer)
    }


}

