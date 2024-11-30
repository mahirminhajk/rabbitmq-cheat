import { Channel, Connection, ConsumeMessage, } from "amqplib";

interface Event {
    exchange: string;
    routeKey: string;
    data: any;
};

export abstract class BaseListener<T extends Event> {
    abstract exchange: T['exchange'];
    abstract routeKey: T['routeKey'];

    private channel?: Channel;

    abstract onMessage(data: T['data'], msg: ConsumeMessage): Promise<void>;

    constructor(private connection: Connection, private queue: string) {}

    async listen() {
        if (!this.connection) throw new Error('❌ Connection not initialized');
        //* Create a new channel
        this.channel = await this.connection.createChannel();
        console.log(`📡 Channel created for listener: ${this.queue}`);

        //* Assert exchange
        await this.channel.assertExchange(this.exchange, 'topic', { durable: true });
        await this.channel.assertQueue(this.queue, { durable: true });

        //* Bind queue
        await this.channel.bindQueue(this.queue, this.exchange, this.routeKey);
        console.log(`🔗 Ready to listen in exchange "${this.exchange}" with route key "${this.routeKey}`);
        
        
        //* Consume messages
        this.channel.consume(
            this.queue,
            async (msg) => {
                if (msg) {
                    try {
                        console.log(`📥 Event received: ${this.exchange} - ${this.queue} - ${this.routeKey}`);
                        const parseData = JSON.parse(msg.content.toString());
                        await this.onMessage(parseData, msg);
                        this.channel?.ack(msg);
                    } catch (error) {
                        console.error('❌ Error processing message:', error);
                        if(msg && msg.properties.headers && msg.properties.headers['x-redelivered-count'] < 3){
                            console.error('❌ Message redelivered less than 3 times. requeueing message');
                            //* nack the message
                            this.channel?.nack(msg, false, true);
                        }
                        else{
                            console.error('💀 Publishing message to dead letter exchange');
                            //TODO: publish this message to a dead letter exchange
                            //* nack the message
                            this.channel?.nack(msg, false, false);
                        }
                    }
                }
            },
            { noAck: false }
        );

    };
};


