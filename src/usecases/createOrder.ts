import axios from 'axios';
import OrderModel from '../infra/database/models/mongoose/order.model';
import { OrderDocument } from '../infra/database/models/mongoose/order.model';
import OrderRepository from '../infra/repository/order.repository';

class CreateOrder {
  orderModel: typeof OrderModel;
  orderRepository: OrderRepository;

  constructor({
    orderModel,
    orderRepository,
  }: {
    orderModel: typeof OrderModel;
    orderRepository: OrderRepository;
  }) {
    this.orderModel = orderModel;
    this.orderRepository = orderRepository;
  }

  async execute(payload: OrderDocument) {
    try {
      // Check if product is available
      const createdOrder = axios
        .post(`${process.env.PRODUCT_SERVICE_URL}/available`, {
          order: {
            productId: payload.productId,
            quantity: payload.quantity,
          },
        })
        .then(async (response) => {
          if (response.data.productAvailable) {
            const newOrder = await this.orderRepository.create(payload);
            await newOrder.save();

            const order = {
              customerId: payload.customerId,
              productId: payload.productId,
              orderId: newOrder._id.toString(),
              amount: payload.amount,
              quantity: payload.quantity,
              orderStatus: newOrder.orderStatus,
            };
            return order;
          } else {
            console.log('Product not available');
          }
        })
        .catch((error) => {
          console.log('error: ', error?.message);
        });
        return createdOrder
    } catch (error) {
      throw error;
    }
  }
}

export default CreateOrder;
