import { Exchanges } from "../../shared/events/exchanges";
import { RouteKeys } from "../../shared/events/routeKeys";
import { OrderCreatedEvent } from "../../shared/events/interfaces/orderCreatedEvent";
import { BaseListener } from "../../shared/events/base/baseListener";

export class OrderCreatedListener extends BaseListener<OrderCreatedEvent>{
    readonly exchange = Exchanges.ORDER_SERVICE;
    readonly routeKey = RouteKeys.ORDER_CREATE;

    async onMessage(data: OrderCreatedEvent['data'], msg: any): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        console.log('✅ Processing event data:', data);
    };
        
}