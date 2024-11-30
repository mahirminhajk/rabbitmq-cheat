import { Exchanges } from "../exchanges";
import { routeKeys } from "../routeKeys";

export interface OrderCreatedEvent {
    exchange: Exchanges.ORDER_SERVICE;
    routeKey: routeKeys.ORDER_CREATE;
    data: {
        id: string;
        name: string;
        price: number;
    }
};