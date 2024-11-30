import { BasePublisher } from "../../shared/events/base/basePublisher";
import { Exchanges } from "../../shared/events/exchanges";
import { OrderDeleteEvent } from "../../shared/events/interfaces/orderDeleteEvent";
import { RouteKeys } from "../../shared/events/routeKeys";

export class OrderDeletePublisher extends BasePublisher<OrderDeleteEvent> {
    readonly exchange = Exchanges.ORDER_SERVICE;
    readonly routeKey = RouteKeys.ORDER_DELETE;
}