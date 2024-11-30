import { Exchanges } from "../exchanges";
import { routeKeys } from "../routeKeys";
import { OrderCreatedEvent } from "../interfaces/order-created-event";
import { BaseListener } from "../base/base-listener";

export class OrderCreatedListener extends BaseListener<OrderCreatedEvent>{
    readonly exchange = Exchanges.ORDER_SERVICE;
    readonly routeKey = routeKeys.ORDER_CREATE;

    async onMessage(data: OrderCreatedEvent['data'], msg: any): Promise<void> {
        console.log('✅ Processing event data:', data);
    };
        
}