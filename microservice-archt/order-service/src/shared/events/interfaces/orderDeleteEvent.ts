import { Exchanges } from "../exchanges";
import { RouteKeys } from "../routeKeys";

export interface OrderDeleteEvent {
    exchange: Exchanges.ORDER_SERVICE;
    routeKey: RouteKeys.ORDER_DELETE;
    data: {
        id: string;
    }
};