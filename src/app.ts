import cors from "cors";
import express, { Application, Request, Response } from "express";
import { ProductRoutes } from "./app/modules/products/product.route";
import { OrderRoutes } from "./app/modules/orders/order.route";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

export default app;
