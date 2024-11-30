import { Router } from "express";

const router = Router();

router.get('/order/delete', async (req, res) => {

    const id = Math.floor(Math.random() * 100);

    const data = {
        id
    }

    //* publish event

    res.send({
        message: `${id} order delete`
    })
});

export default router;