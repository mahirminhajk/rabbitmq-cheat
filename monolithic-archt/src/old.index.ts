import app from "./app"
import { rabbitMQSetup } from "./events/setup";
import { Amqp } from "./services/Amqp";

const PORT = 3000;

const startServer = async () => {
    app.listen(PORT, () => {
        console.log('✅ Server is running on port', PORT);
    });

    //* listen for messages
    await Amqp.receiveMessage();

    await Amqp.receiveMess2('service_exchange', 'inventory_queue', 'order.*', 'Inventory Service');
    await Amqp.receiveMess2('service_exchange', 'notification_queue', 'payment.*', 'Notification Service 1');
    await Amqp.receiveMess2('service_exchange', 'notification_queue', 'payment.*', 'Notification Service 2', 5000);

    await Amqp.setupDLX();
    await Amqp.setupMainQueue();

    await Amqp.setupDelayQueue();
    await Amqp.setupPriorityQueue();

};

startServer();
