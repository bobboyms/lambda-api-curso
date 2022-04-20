import AWS from "aws-sdk";
import {CustomerRepository} from "../../application/repositories/CustomerRepository";
import {Customer} from "../../application/domain/entity/Customer";
import {Empty, Optional} from "../../application/utils/Optional";
import {Connection,  QueryError, RowDataPacket, OkPacket, ConnectionOptions} from 'mysql2';
import mysql from 'mysql2/promise';
import {Address} from "../../application/domain/valueobjects/Address";
import {ID} from "../../application/domain/valueobjects/ID";
import {Name} from "../../application/domain/valueobjects/Name";

export class CustomerRepositoryImp implements CustomerRepository{

    private readonly connectionOptions:ConnectionOptions

    public constructor(region:string, host:string, sqlport:number, username:string, database:string) {

        const signer = new AWS.RDS.Signer({})

        this.connectionOptions = {
            host     : host,
            user     : username,
            database : database,
            ssl: 'Amazon RDS',
            authPlugins: { mysql_clear_password: () => () => signer.getAuthToken(
                    {
                        region: region,
                        hostname: host,
                        port: sqlport,
                        username: username
                    }
                ) }
        }

    }

    private async createConnection():Promise<mysql.Connection> {

        return Promise.resolve(
            await mysql.createConnection(this.connectionOptions as ConnectionOptions)
        )

    }

    public async findById(id: string): Promise<Optional<Empty | Customer>> {

        const connection = await this.createConnection()

        const result:any = await connection.execute(
            'SELECT * FROM customer WHERE `id` = ?',
            [id]);


        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        if (result[0].length < 1) {
            return Promise.resolve(Optional.empty())
        }

        const  resultData:any = result[0][0];

        return  Promise.resolve(
            Optional.of(
                new Customer(
                    new ID(resultData.id),
                    new Name(resultData.name),
                    new Address(
                        resultData.address.streetName,
                        resultData.address.number,
                        resultData.address.city
                    )
                )
            )
        )

    }

    public async save(object: Customer): Promise<Customer> {
        return Promise.resolve();
    }

}