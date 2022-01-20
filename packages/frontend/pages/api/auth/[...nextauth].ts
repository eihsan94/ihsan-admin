import { NextApiRequest, NextApiResponse } from 'next'
import GoogleProvider from "next-auth/providers/google";
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter"
import AWS from "aws-sdk";
import axios from "axios";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import NextAuth, { NextAuthOptions } from 'next-auth';
import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}`;
axios.defaults.headers.post['Content-Type'] ='application/json';



const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY as string,
  },
  endpoint: process.env.DATABASE_URL,
  region: process.env.NEXT_AUTH_AWS_REGION,
};

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
})

const options: NextAuthOptions  = {
    providers: [
      GoogleProvider({
        clientId:`${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      }),
    ],
    // // CONFIG NEXT AUTH WITH DYNAMODB
    adapter: DynamoDBAdapter(
        client,
        {tableName: `${process.env.NEXT_AUTH_DATABASE_NAME}-user`},
    ),
    // THIS NEED TO BE ENABLED FOR MAKING THE SESSION TO WORK WITH JWT
    session: {
      strategy: "database",
    },
}

const NextAuthApi = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)
export default NextAuthApi