import { Router } from "express";
import { orderDeletePublisher } from "../event/setup";

const router = Router();

router.get('/order/delete', async (req, res) => {

    const id = Math.floor(Math.random() * 100);

    const data = {
        id
    }

    //* publish event
    orderDeletePublisher.publish({
        id: data.id.toString()
    })

    res.send({
        message: `${id} order delete`
    })
});

export default router;