import { Exchanges } from "../exchanges";
import { RouteKeys } from "../routeKeys";

export interface OrderCreatedEvent {
    exchange: Exchanges.ORDER_SERVICE;
    routeKey: RouteKeys.ORDER_CREATE;
    data: {
        id: string;
        name: string;
        price: number;
    }
};