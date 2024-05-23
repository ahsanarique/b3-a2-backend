import express, { Application, Request, Response } from 'express';
import cors from "cors";
import { ProductRoutes } from './app/modules/product/product.route';

const app: Application = express()

app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRoutes);

const initial = (req: Request, res: Response) => {
  const message = "Welcome"
  res.send(message);
}

app.get("/", initial);

export default app;