import { v4 as uuid4 } from 'uuid';
import {DocumentClient, QueryOutput} from "aws-sdk/clients/dynamodb";
import {Empty, Optional} from "../../application/utils/Optional";
import {SubscriptionRepository} from "../../application/repositories/SubscriptionRepository";
import {Subscription} from "../../application/domain/agregates/Subscription";
import {ID} from "../../application/domain/valueobjects/ID";
import {Customer} from "../../application/domain/entity/Customer";
import {Plan} from "../../application/domain/entity/Plan";
import {Name} from "../../application/domain/valueobjects/Name";
import {Address} from "../../application/domain/valueobjects/Address";
import {Price} from "../../application/domain/valueobjects/Price";

export class SubscriptionRepositoryImp implements SubscriptionRepositoryImp{

    private readonly client:DocumentClient
    private readonly tableName:string

    constructor(client: DocumentClient, tableName: string) {
        this.client = client;
        this.tableName = tableName
    }

    public async findById(id: string): Promise<Optional<Subscription | Empty>> {
        
        const params = {
            TableName : this.tableName,
            IndexName: "CustomerIndex",
            KeyConditionExpression: "PersonContactValue = :PersonContactValue",
            FilterExpression: "Id = :ID",
            ExpressionAttributeValues: {
                ":ID": id,
            }
        }

        const result = await this.client.query(params).promise()

        if (result.Items?.length === 0) {
            return Promise.resolve(Optional.empty())
        }

        const LocalItem:any = result.Items?.map(it => it)[0]

        const {Customer} = LocalItem
        const {Plann} = LocalItem
        const {Adress} = Customer

        return Promise.resolve(Optional.of(
            new Subscription(
                new ID(LocalItem.Id),
                new Customer(
                    new ID(Customer.Id),
                    new Name(Customer.Name),
                    new Address(
                        Adress.StreetName,
                        Adress.Number,
                        Adress.city
                    )
                ),
                new Plan(
                    new ID(Plann.Id),
                    Name.create(Plann.Name),
                    new Price(Plann.Price)
                ),
                LocalItem.dateTime
            )
        ))
    }

    public async update(subscription: Subscription): Promise<void> {

        try {

            const { customer } = subscription
            const { address } = customer

            const params = {
                TableName:this.tableName,
                Key: {
                    Id:subscription.id.value
                },
                UpdateExpression: "set Customer = :Customer",
                ExpressionAttributeValues:{
                    ":Customer":{
                        id: customer.id.value,
                        name: customer.name.value,
                        address: {
                            streetName: address.streetName,
                            number: address.number,
                            city:address.city

                        }
                    },
                },
            };

            await this.client.update(params).promise();
        } catch (e) {
            return Promise.reject(e)
        }

    }

    public async save(subscription: Subscription): Promise<Subscription> {
        try {

            const { customer } = subscription
            const { address } = customer

            const params = {
                TableName:this.tableName,
                Item: {
                    Id: subscription.id.value,
                    Customer:{
                        Id: customer.id.value,
                        Name: customer.name.value,
                        Address: {
                            StreetName: address.streetName,
                            Number: address.number,
                            City:address.city

                        }
                    },
                    Plan:subscription.plan,
                    DateTime:subscription.dateTime,
                }
            };

            await this.client.put(params).promise();
            return Promise.resolve(subscription);
        } catch (e) {
            return Promise.reject(e)
        }
    }


}