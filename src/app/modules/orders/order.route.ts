import express from "express";

import validateRequest from "../../../middleware/validateRequest";
import { createOrderValidationSchema } from "./order.validation";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(createOrderValidationSchema),
  OrderControllers.createOrder
);

router.get("/", OrderControllers.getAllOrders);

export const OrderRoutes = router;
