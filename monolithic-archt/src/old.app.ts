import express from 'express';
import { Amqp } from './services/Amqp';

const app = express();

app.get('/send/:id', async (req, res) => {
    const id = req.params.id;

    // Send message to RabbitMQ
    await Amqp.sendMessage({ id });

    res.send('Message sent to RabbitMQ');
});

app.get('/order/:id', async (req, res) => {
    const id = req.params.id;

    // Send message to RabbitMQ
    await Amqp.sendMess2('service_exchange', 'order.create', { id }, 'Order Service');

    res.send('Message sent to RabbitMQ');
});

app.get('/payment', async (req, res) => {

    // random id
    const id = Math.floor(Math.random() * 1000);

    // Send message to RabbitMQ
    await Amqp.sendMess2('service_exchange', 'payment.completed', { id }, 'Payment Service');

    res.send('Message sent to RabbitMQ');
});

app.get('/main/:id', async (req, res) => {
    const id = req.params.id;

    // Send message to RabbitMQ
    await Amqp.sendMess3('main_queue', { id }, 'Main Service', {
        durable: true,
        arguments: {
            'x-dead-letter-exchange': 'dlx_exchange',
            'x-dead-letter-routing-key': 'dlx.key'
        }
    });
    await Amqp.sendMess3('priority_queue', { id }, 'priority Service', {
        durable: true,
        arguments: {
            'x-max-priority': 10
        }
    });

    res.send('Message sent to RabbitMQ');
});

app.get('/delay/:id', async (req, res) => {
    const id = req.params.id;

    // Send message to RabbitMQ
    await Amqp.sendMess3('delay_queue', { id }, 'delay Service', {
        durable: true,
        arguments: {
            'x-dead-letter-exchange': 'dlx_exchange',
            'x-dead-letter-routing-key': 'dlx.key',
            'x-message-ttl': 5000,
            'x-expires': 10000
        }
    });

    res.send('Message sent to RabbitMQ');
});

export default app;
