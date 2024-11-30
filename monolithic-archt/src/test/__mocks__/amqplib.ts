const channelMock = {
    assertExchange: jest.fn().mockResolvedValue({}),
    assertQueue: jest.fn().mockResolvedValue({}),
    bindQueue: jest.fn().mockResolvedValue({}),
    publish: jest.fn().mockResolvedValue(true),
    consume: jest.fn((queue, onMessage) => {
        // Simulate a message
        const msg = {
            content: Buffer.from(JSON.stringify({ id: "123", name: "test", price: 50 })),
        }
        onMessage(msg);
        return Promise.resolve();
    }),
    ask: jest.fn(),
    ack: jest.fn(),    
    
};

const connectionMock = {
    createChannel: jest.fn().mockResolvedValue(channelMock),
    close: jest.fn().mockResolvedValue({}),
};

const amqplib = {
    connect: jest.fn().mockResolvedValue(connectionMock),
};

export default amqplib;