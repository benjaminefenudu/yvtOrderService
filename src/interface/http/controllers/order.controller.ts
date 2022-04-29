import { Request, Response } from 'express';
import CreateOrder from '../../../usecases/createOrder';
import PayForOrder from '../../../usecases/payForOrder';

class OrderController {
  createOrder: CreateOrder;
  payForOrder: PayForOrder;

  constructor({
    createOrder,
    payForOrder,
  }: {
    createOrder: CreateOrder;
    payForOrder: PayForOrder;
  }) {
    this.createOrder = createOrder;
    this.payForOrder = payForOrder;
  }

  async create(req: Request, res: Response) {
    try {
      const payload = req.body.order;
      const order = await this.createOrder.execute(payload);

      res.status(201).json({
        success: true,
        msg: `Order created`,
        order: order,
      });

      await this.payForOrder.execute(order);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, msg: `${error.message}` });
        throw new Error(`${error.message}`);
      }
      throw error;
    }
  }
}

export default OrderController;
