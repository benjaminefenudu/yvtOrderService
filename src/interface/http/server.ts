import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
import container from '../../../di-setup';
const { database, messenger } = container.cradle;

database();
messenger.createChannel();

const PORT = process.env.PORT || 4002;

app.use(express.json());
import orderRouter from './routes/order.routes';

// Set test page
app.get('/', (req, res) => {
  res.send('<h1>Order Service<h1>');
});

app.use('/v1/orders', orderRouter);

app.listen(PORT, () => {
  console.log(`Order Service listening on Port ${PORT}...`);
});
