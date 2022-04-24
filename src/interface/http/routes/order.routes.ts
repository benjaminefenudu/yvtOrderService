import { Request, Response, Router } from 'express';
import container from '../../../../di-setup';

const { orderController } = container.cradle;

const OrderRouter = Router();

OrderRouter.post('/', (req: Request, res: Response) =>
  orderController.create(req, res)
);

export default OrderRouter;
