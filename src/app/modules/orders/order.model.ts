/* eslint-disable no-useless-escape */
import { Schema, model } from "mongoose";
import { OrderRequest } from "./order.interface";

const OrderRequestSchema = new Schema<OrderRequest>({
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  productId: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
});

export const OrderModel = model<OrderRequest>("Order", OrderRequestSchema);
