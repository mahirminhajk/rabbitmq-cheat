import { Router  } from "express";

import { orderCreatedPublisher } from "../events/setup";

const router = Router();

router.get('/create', async (req, res) => {

    // publish message to RabbitMQ
    await orderCreatedPublisher.publish({ id: '123', name: 'order 1', price: 100 });


    res.send('Message sent to RabbitMQ');
});


export default router;