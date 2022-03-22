import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";


export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.log(`Path: ${event.path}`)

    return {
        statusCode:200,
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            message:"Olá mundo!"
        })
    }

};