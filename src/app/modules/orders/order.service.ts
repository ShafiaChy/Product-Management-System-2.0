import { Product } from "../products/product.interface";
import { ProductModel } from "../products/product.model";
import { OrderRequest } from "./order.interface";
import { OrderModel } from "./order.model";
import mongoose from "mongoose";
const createOrderIntoDB = async (Order: OrderRequest, product: Product) => {
  if (product?.inventory?.quantity < Order.quantity) {
    const result = "Insufficient quantity available in inventory";
    return result;
  } else {
    const result = await OrderModel.create(Order);
    const update = Number(product.inventory.quantity - Order.quantity);
    console.log(typeof Order.productId);
    if (update < 1) {
      await ProductModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(Order.productId) },
        {
          "inventory.quantity": update,
          "inventory.inStock": false,
        },
        { new: true, runValidators: true }
      );
      return result;
    } else {
      await ProductModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(Order.productId) },
        { "inventory.quantity": update },
        { new: true, runValidators: true }
      );
      return result;
    }
  }
};

const getAllOrdersFromDB = async (email: string) => {
  const searchByEmail = {};
  if (email) {
    const result = await OrderModel.find({
      email,
    });
    console.log(result);
    return result;
  }
  const result = await OrderModel.find(searchByEmail);
  return result;
};
export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
