import express from 'express';

import completeRouter from "./routes/complete";
import refundRouter from "./routes/refund";

const app = express();

app.use('/', completeRouter);
app.use('/', refundRouter)


export default app;
