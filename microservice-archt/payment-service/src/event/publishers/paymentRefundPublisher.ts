import { BasePublisher } from "../../shared/events/base/basePublisher";
import { Exchanges } from "../../shared/events/exchanges";
import { PaymentRefundEvent } from "../../shared/events/interfaces/paymentRefundEvent";
import { RouteKeys } from "../../shared/events/routeKeys";

export class PaymentRefundPublisher extends BasePublisher<PaymentRefundEvent> {
    readonly exchange = Exchanges.PAYMENT_SERVICE;
    readonly routeKey = RouteKeys.PAYMENT_REFUND;
}