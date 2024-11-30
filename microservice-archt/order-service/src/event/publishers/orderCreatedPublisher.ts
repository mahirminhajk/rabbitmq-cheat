import { BasePublisher } from "../../shared/events/base/basePublisher";
import { Exchanges } from "../../shared/events/exchanges";
import { OrderCreatedEvent } from "../../shared/events/interfaces/orderCreatedEvent";
import { RouteKeys } from "../../shared/events/routeKeys";

export class OrderCreatedPublisher extends BasePublisher<OrderCreatedEvent> {
    readonly exchange = Exchanges.ORDER_SERVICE;
    readonly routeKey = RouteKeys.ORDER_CREATE;
}