import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await OrderServices.createOrderInDB(req.body);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};

const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.query.email as string | undefined;
    const orders = await OrderServices.getOrdersFromDB(email);

    res.status(200).json({
      success: true,
      message: 'Order list received successfully',
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};

export const OrderControllers = {
    createOrder,
    getOrders
}
