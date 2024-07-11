import { Request, Response } from "express";
import { OrderServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.createOrderIntoDB(req.body);
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

    res.status(200).json({
      success: true,
      message: "Orders are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const OrderControllers = {
  createOrder,

  getAllOrders,
};
