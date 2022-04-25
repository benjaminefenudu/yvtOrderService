import {
  asValue,
  Lifetime,
  asClass,
  asFunction,
  InjectionMode,
  createContainer,
} from 'awilix';
import database from './src/infra/database/mongoose';
import Messenger from './src/utils/messenger.utils';
import OrderModel from './src/infra/database/models/mongoose/order.model';
import OrderRepository from './src/infra/repository/order.repository';
import CreateOrder from './src/usecases/createOrder';
import OrderController from './src/interface/http/controllers/order.controller';

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  database: asValue(database),
  messenger: asClass(Messenger, { lifetime: Lifetime.SINGLETON }),
  orderModel: asValue(OrderModel),
  orderRepository: asClass(OrderRepository),
  createOrder: asClass(CreateOrder),
  orderController: asClass(OrderController),
});

export default container;
