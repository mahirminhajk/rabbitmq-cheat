import rabbitConnector from "../connect";
import { OrderCreatedListener } from "../listeners/orderCreatedListener";
import { OrderDeleteListener } from "../listeners/orderDeleteListener";
import { PaymentCompletePublisher } from "../publishers/paymentCompletePublisher";
import { PaymentRefundPublisher } from "../publishers/paymentRefundPublisher";
import { queueName } from "../queue";


export let paymentCompletePublisher: PaymentCompletePublisher;
export let paymentRefundPublisher: PaymentRefundPublisher;

export const rabbitMQSetup = async (): Promise<void> => {
    //* connect
    await rabbitConnector.init('amqp://rabbitmq-srv:5672');
    //* publishers
    paymentCompletePublisher = new PaymentCompletePublisher(rabbitConnector.publishChannel);
    paymentRefundPublisher = new PaymentRefundPublisher(rabbitConnector.publishChannel);
    //* listeners
    new OrderCreatedListener(rabbitConnector.connection, queueName).listen();
    new OrderDeleteListener(rabbitConnector.connection, queueName).listen();
};