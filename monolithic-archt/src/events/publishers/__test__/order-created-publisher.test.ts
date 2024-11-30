import { OrderCreatedPublisher } from "../order-created-publisher";
import rabbitConnector from "../../connect/rabbit-connector";
import amqplib from "amqplib";

import { Exchanges } from "../../exchanges";
import { routeKeys } from "../../routeKeys";

jest.mock("amqplib");

describe("OrderCreatedPublisher", () => {
    beforeAll(async () => {
        await rabbitConnector.init("amqp://localhost");
    });

    afterAll(()=>{
        //* clear mock
        jest.clearAllMocks();
    })    

    it("should publish a message", async () => {
        const publisher = new OrderCreatedPublisher(rabbitConnector.publishChannel);

        await publisher.publish({ id: "123", name: "order", price: 20 });

        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
        expect(channel.publish).toHaveBeenCalledWith(
            Exchanges.ORDER_SERVICE,
            routeKeys.ORDER_CREATE,
            expect.any(Buffer),
            expect.objectContaining({ persistent: true })
        );
    });

});
