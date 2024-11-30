import { Channel, Connection } from "amqplib";

interface Event {
    exchange: string;
    routeKey: string;
    data: any;
};

export abstract class BasePublisher<T extends Event> {
    abstract exchange: T['exchange'];
    abstract routeKey: T['routeKey'];

    private initialized = false;

    // private connection: Connection;
    private channel: Channel;

    constructor(channel: Channel) {
        this.channel = channel;
    }

    private async initialize(): Promise<void> {
        if(!this.initialized){
            await this.channel.assertExchange(this.exchange, 'topic', { durable: true });
            this.initialized = true;
            console.log(`✅ Exchange "${this.exchange}" asserted`);
        }
    }

    async publish(data: T['data']): Promise<void> {
        try {
            await this.initialize();
            this.channel.publish(this.exchange, this.routeKey, Buffer.from(JSON.stringify(data)), { persistent: true });
            console.log(`📤 Event published: ${this.exchange} - ${this.routeKey}`);
        } catch (error) {
            console.error('Error publishing event:', error);
            throw error;
        }
    }
}