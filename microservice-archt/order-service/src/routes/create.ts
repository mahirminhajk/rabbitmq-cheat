import { Router } from "express";

const router = Router();

router.get('/order/create', async (req, res)=>{

    const id = Math.floor(Math.random() * 100); 

    const data ={
        id,
        name: `order-${id}`,
        price: 50,
    }

    //* publish event

    res.send({
        message: `order-${id} created`
    })
});

export default router;