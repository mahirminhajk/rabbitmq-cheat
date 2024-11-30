import { Exchanges } from "../../shared/events/exchanges";
import { RouteKeys } from "../../shared/events/routeKeys";
import { OrderCreatedEvent } from "../../shared/events/interfaces/orderCreatedEvent";
import { BaseListener } from "../../shared/events/base/baseListener";
import { PaymentRefundEvent } from "../../shared/events/interfaces/paymentRefundEvent";

export class PaymentRefundListener extends BaseListener<PaymentRefundEvent> {
    readonly exchange = Exchanges.PAYMENT_SERVICE;
    readonly routeKey = RouteKeys.PAYMENT_REFUND;

    async onMessage(data: OrderCreatedEvent['data'], msg: any): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log('✅ Processing event data:', data);
    };

}