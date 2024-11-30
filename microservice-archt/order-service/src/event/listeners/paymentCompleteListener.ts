import { Exchanges } from "../../shared/events/exchanges";
import { RouteKeys } from "../../shared/events/routeKeys";
import { OrderCreatedEvent } from "../../shared/events/interfaces/orderCreatedEvent";
import { BaseListener } from "../../shared/events/base/baseListener";
import { PaymentCompleteEvent } from "../../shared/events/interfaces/paymentCompleteEvent";

export class PaymentCompleteListener extends BaseListener<PaymentCompleteEvent> {
    readonly exchange = Exchanges.PAYMENT_SERVICE;
    readonly routeKey = RouteKeys.PAYMENT_COMPLETED;

    async onMessage(data: OrderCreatedEvent['data'], msg: any): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log('✅ Processing event data:', data);
    };

}