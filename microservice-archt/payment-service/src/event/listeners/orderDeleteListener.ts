import { Exchanges } from "../../shared/events/exchanges";
import { RouteKeys } from "../../shared/events/routeKeys";
import { OrderCreatedEvent } from "../../shared/events/interfaces/orderCreatedEvent";
import { BaseListener } from "../../shared/events/base/baseListener";
import { OrderDeleteEvent } from "../../shared/events/interfaces/orderDeleteEvent";

export class OrderDeleteListener extends BaseListener<OrderDeleteEvent>{
    readonly exchange = Exchanges.ORDER_SERVICE;
    readonly routeKey = RouteKeys.ORDER_DELETE;

    async onMessage(data: OrderCreatedEvent['data'], msg: any): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('✅ Processing event data:', data);
    };
        
}