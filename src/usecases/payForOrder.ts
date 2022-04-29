import axios from 'axios';
import OrderModel from '../infra/database/models/mongoose/order.model';
import { OrderDocument } from '../infra/database/models/mongoose/order.model';
import OrderRepository from '../infra/repository/order.repository';

class PayForOrder {
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

  async execute(payload: any) {
    try {
      axios
        .post(`${process.env.PAYMENT_SERVICE_URL}`, {
          order: payload,
        })
        .then(async (res) => {
          const orderId = payload.orderId;
          let foundOrder = await this.orderRepository.findOrder(orderId);
          if (res.data.success) {
            foundOrder.orderStatus = 'complete';
            await foundOrder.save();
            return;
          } else {
            // todo: release reserved product
            axios.post(`${process.env.PRODUCT_SERVICE_URL}/release`, {
              order: {
                productId: payload.productId,
                quantity: payload.quantity,
              },
            });

            // todo: update order status to failed
            foundOrder.orderStatus = 'failed';
            await foundOrder.save();
          }
        })
        .catch((error) => {
          console.log('error: ', error?.message);
        });
    } catch (error) {
      throw error;
    }
  }
}

export default PayForOrder;
