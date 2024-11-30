import { Router } from "express";
import { randomUUID } from "node:crypto";
import { paymentRefundPublisher } from "../event/setup";

const router = Router();

router.get('/payment/refund', async (req, res) => {

    const id = randomUUID();
    const price = Math.floor(Math.random() * 10000);

    const data = {
        id,
        price,
    }

    //* publish event
    await paymentRefundPublisher.publish(data);

    res.send({
        message: `payment ${id} of ${price} refunded`
    })
});

export default router;