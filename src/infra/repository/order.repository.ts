import OrderModel, {
  OrderDocument,
} from '../database/models/mongoose/order.model';

class OrderRepository {
  orderModel: typeof OrderModel;

  constructor({ orderModel }: { orderModel: typeof OrderModel }) {
    this.orderModel = orderModel;
  }

  async create(payload: OrderDocument) {
    try {
      let { customerId, productId, quantity, amount } = payload;

      const order = await this.orderModel.create({
        customerId,
        productId,
        quantity,
        amount,
      });
      const savedOrder = await order.save();

      return savedOrder;
    } catch (error) {
      throw error;
    }
  }
}

export default OrderRepository;
