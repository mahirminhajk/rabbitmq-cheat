import { BasePublisher } from "../../shared/events/base/basePublisher";
import { Exchanges } from "../../shared/events/exchanges";
import { PaymentCompleteEvent } from "../../shared/events/interfaces/paymentCompleteEvent";
import { RouteKeys } from "../../shared/events/routeKeys";

export class PaymentCompletePublisher extends BasePublisher<PaymentCompleteEvent> {
    readonly exchange = Exchanges.PAYMENT_SERVICE;
    readonly routeKey = RouteKeys.PAYMENT_COMPLETED;
}