import { APIGatewayProxyHandler } from "aws-lambda";
import morgan from 'morgan'
import express, { Response } from 'express'
import ServerlessHttp from 'serverless-http'
import cors from 'cors'
import userRoutes from "./modules/routes/userRoutes";
import roleRoutes from "./modules/routes/roleRoutes";

const app = express();

app.use(cors())
if (process.env.STAGE === 'dev' || process.env.STAGE === 'local') {
  app.use(morgan('dev'))
}

app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/roles', roleRoutes)



app.use((res: Response) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export const server: APIGatewayProxyHandler = ServerlessHttp(app) as APIGatewayProxyHandler;