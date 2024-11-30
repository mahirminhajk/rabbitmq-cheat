import rabbitConnector from "../../connect/rabbit-connector";
import { queueName } from "../../queue";
import { OrderCreatedListener } from "../order-created-listener";

import amqplib from "amqplib";

jest.mock("amqplib");

describe("OrderCreatedListener", () => {
    beforeAll(async () => {
        await rabbitConnector.init("amqp://localhost");
    });

    afterAll(() => {
        //* clear mock
        jest.clearAllMocks();
    })   

    it("should consume a message and process it", async () => {
        const listener = new OrderCreatedListener(rabbitConnector.connection, queueName);
        const onMessageSpy = jest.spyOn(listener, "onMessage");

        await listener.listen();

        expect(onMessageSpy).toHaveBeenCalledWith(
            expect.objectContaining({ id: "123", name: "test", price: 50 }),
            expect.anything()
        );
    });
});
