import express from 'express';

import createOrderRouter from "./routes/create";
import deleteOrderRouter from "./routes/delete";

const app = express();

app.use('/', createOrderRouter);
app.use('/', deleteOrderRouter);

export default app;
