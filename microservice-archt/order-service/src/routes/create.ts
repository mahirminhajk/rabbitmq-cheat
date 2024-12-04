import { Router } from "express";
import { randomUUID } from "node:crypto";

import { orderCreatedPublisher } from "../event/setup";
// import { elasticSearchService } from "../services/elasticSearch";
import redisService from "../services/redisService";

const router = Router();


router.get('/order/1', async (req, res) => {
    res
    .status(200)
    .send({
        message: 'order 1'
    })
 });
router.get('/order/2', async (req, res) => {
    res
    .status(400)
    .send({
        message: 'order 2'
    })
});
router.get('/order/3', async (req, res) => { 
    res
    .status(500)
    .send({
        message: 'order 3'
    })
});

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

    await redisService.set(id, JSON.stringify(data), 60);
    // await elasticSearchService.indexOrder(data);

});

export default router;