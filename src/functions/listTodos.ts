import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from "src/utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters;

  const response = await document
    .query({
      TableName: "todos",
      IndexName: "UserIdIndex",
      KeyConditionExpression: "user_id = :user_id",
      ExpressionAttributeValues: {
        ":user_id": userId,
      }
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items),
  }
}