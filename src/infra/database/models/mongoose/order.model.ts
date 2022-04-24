import mongoose from 'mongoose';

export interface OrderDetails {
  customerId: string;
  productId: string;
  amount: number;
  quantity: number;
}

export interface OrderDocument extends OrderDetails, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model<OrderDocument>('Order', orderSchema);

export default OrderModel;
