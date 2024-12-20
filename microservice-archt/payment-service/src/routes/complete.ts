import { Router } from "express";
import { randomUUID } from "node:crypto";
import { paymentCompletePublisher } from "../event/setup";

const router = Router();

router.get('/payment/complete', async (req, res) => {

    const id = randomUUID();
    const price = Math.floor(Math.random() * 10000);

    const data = {
        id,
        price,
    }

    //* publish event
    await paymentCompletePublisher.publish(data);

    res.send({
        message: `payment ${id} of ${price} completed`
    })
});

export default router;