import { OrderRequest } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (Order: OrderRequest) => {
  const result = await OrderModel.create(Order);

  return result;
};

const getAllOrdersFromDB = async (email: string) => {
  const emailQuery = {};
  if (email) {
    const result = await OrderModel.find({
      email,
    });
    return result;
  }
  const result = await OrderModel.find(emailQuery);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
