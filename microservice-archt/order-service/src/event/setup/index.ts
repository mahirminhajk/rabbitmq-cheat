import rabbitConnector from "../connect";
import { PaymentCompleteListener } from "../listeners/paymentCompleteListener";
import { PaymentRefundListener } from "../listeners/paymentRefundListener";
import { OrderCreatedPublisher } from "../publishers/orderCreatedPublisher";
import { OrderDeletePublisher } from "../publishers/orderDeletePublisher";
import { queueName } from "../queue";


export let orderCreatedPublisher: OrderCreatedPublisher;
export let orderDeletePublisher: OrderDeletePublisher;

export const rabbitMQSetup = async (): Promise<void> => {
    //* connect
    await rabbitConnector.init('amqp://rabbitmq-srv:5672');
    //* publishers
    orderCreatedPublisher = new OrderCreatedPublisher(rabbitConnector.publishChannel);
    orderDeletePublisher = new OrderDeletePublisher(rabbitConnector.publishChannel);
    //* listeners
    new PaymentCompleteListener(rabbitConnector.connection, queueName).listen();
    new PaymentRefundListener(rabbitConnector.connection, queueName).listen();
};