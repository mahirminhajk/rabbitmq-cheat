import { Exchanges } from "../exchanges";
import { RouteKeys } from "../routeKeys";

export interface PaymentCompleteEvent {
    exchange: Exchanges.PAYMENT_SERVICE;
    routeKey: RouteKeys.PAYMENT_COMPLETED;
    data: {
        id: string;
        price: number;
    }
};