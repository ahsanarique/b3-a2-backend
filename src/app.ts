import express, { Application } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/api", (req, res) => res.send("Base route for api"));

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

export default app;