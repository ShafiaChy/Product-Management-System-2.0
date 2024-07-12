import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import { ProductModel } from "../products/product.model";
import { Product } from "../products/product.interface";

const createOrder = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findOne({ _id: req.body.productId });

    const result = await OrderServices.createOrderIntoDB(
      req.body,
      product as Product
    );
    console.log(result);

    res.status(200).json({
      success: true,
      message: "Order created succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const searchQuery = req?.query?.email;
    const result = await OrderServices.getAllOrdersFromDB(
      searchQuery as string
    );

    if (result.length === 0) {
      res.status(200).json({
        success: false,
        message: "Order not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Order created succesfully",
        data: result,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const OrderControllers = {
  createOrder,

  getAllOrders,
};
