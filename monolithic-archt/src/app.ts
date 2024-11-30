import express from 'express';

import createOrder from "./routes/create-order";

const app = express();

app.use('/', createOrder)

export default app;
