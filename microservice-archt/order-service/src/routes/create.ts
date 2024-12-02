import { Router } from "express";
import { randomUUID } from "node:crypto";

import { orderCreatedPublisher } from "../event/setup";
import { elasticSearchService } from "../services/elasticSearch";

const router = Router();

router.get('/order/create', async (req, res)=>{

    const id = randomUUID(); 

    const data ={
        id,
        name: `order-${id}`,
        price: 50,
    }

    //* publish event
    orderCreatedPublisher.publish({
        id: data.id,
        name: data.name,
        price: data.price,
    });

    res.send({
        message: `order-${id} created`
    });

    await elasticSearchService.indexOrder(data);

});

export default router;