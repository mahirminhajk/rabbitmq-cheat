import { Exchanges } from "../exchanges";
import { RouteKeys } from "../routeKeys";

export interface PaymentRefundEvent {
    exchange: Exchanges.PAYMENT_SERVICE;
    routeKey: RouteKeys.PAYMENT_REFUND;
    data: {
        id: string;
        price: number;
    }
};