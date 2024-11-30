import { Router } from "express";
import { orderCreatedPublisher } from "../event/setup";

const router = Router();

router.get('/order/create', async (req, res)=>{

    const id = Math.floor(Math.random() * 100); 

    const data ={
        id,
        name: `order-${id}`,
        price: 50,
    }

    //* publish event
    orderCreatedPublisher.publish({
        id: data.id.toString(),
        name: data.name,
        price: data.price,
    });

    res.send({
        message: `order-${id} created`
    })
});

export default router;