import rabbitConnector from "../connect/rabbit-connector";
import { OrderCreatedListener } from "../listeners/order-created-listener";
import { OrderCreatedPublisher } from "../publishers/order-created-publisher";
import { queueName } from "../queue";


export let orderCreatedPublisher: OrderCreatedPublisher;

export const rabbitMQSetup = async (): Promise<void> => {
    //* connect
    await rabbitConnector.init('amqp://localhost');
    //* publishers
    orderCreatedPublisher = new OrderCreatedPublisher(rabbitConnector.publishChannel);
    //* listeners
    new OrderCreatedListener(rabbitConnector.connection, queueName).listen();
};