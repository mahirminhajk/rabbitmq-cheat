import { BasePublisher } from "../base/base-publisher";
import { Exchanges } from "../exchanges";
import { OrderCreatedEvent } from "../interfaces/order-created-event";
import { routeKeys } from "../routeKeys";

export class OrderCreatedPublisher extends BasePublisher<OrderCreatedEvent> {
    readonly exchange = Exchanges.ORDER_SERVICE;
    readonly routeKey = routeKeys.ORDER_CREATE;
}