import express from 'express';
import promClient from "prom-client";

import createOrderRouter from "./routes/create";
import deleteOrderRouter from "./routes/delete";

const app = express();

//* Prometheus metrics
promClient.collectDefaultMetrics();

const counter = new promClient.Counter({
    name: 'order_http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status']
});

app.use((req, res, next) => {
    res.on('finish', () => {
        counter.inc({
            method: req.method,
            route: req.route ? req.route.path : 'unknown',
            status: res.statusCode
        });
    }); // Finish event
    next();
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    const metrics = await promClient.register.metrics(); // Await the metrics collection
    res.end(metrics);
});

app.use('/', createOrderRouter);
app.use('/', deleteOrderRouter);

export default app;
