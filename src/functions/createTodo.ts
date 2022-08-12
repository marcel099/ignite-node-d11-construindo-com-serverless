import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuidV4 } from "uuid";

import { document } from "../utils/dynamodbClient";

interface ICreateTodoRequestBody {
  title: string;
  deadline: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters;
  const { title, deadline } =
    JSON.parse(event.body) as ICreateTodoRequestBody;

  await document
    .put({
      TableName: "todos",
      Item: {
        id: uuidV4(),
        user_id: userId,
        title: title,
        done: false,
        deadline: String(new Date(deadline).toJSON()),
      }
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Todo created"
    })
  }
}