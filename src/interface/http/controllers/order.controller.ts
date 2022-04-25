import { Request, Response } from 'express';
import CreateOrder from '../../../usecases/createOrder';

class OrderController {
  createOrder: CreateOrder;

  constructor({ createOrder }: { createOrder: CreateOrder }) {
    this.createOrder = createOrder;
  }

  async create(req: Request, res: Response) {
    try {
      const payload = req.body.order;
      const order = await this.createOrder.execute(payload);

      if (order?.success) {
        return res.status(201).json({
          success: true,
          msg: `Order was successful`,
          order: order,
        });
      } else {
        return res.status(400).json({
          success: false,
          msg: `Order failed`,
        });
      }
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
