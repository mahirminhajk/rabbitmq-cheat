import amqp, { Channel, Connection } from "amqplib";

class RabbitConnector {
    private _connection?: Connection;
    private _publishChannel?: Channel;

    get connection() {
        if (!this._connection) throw new Error('❌ RabbitMQ connection not established');
        return this._connection;
    }

    get publishChannel() {
        if (!this._publishChannel) throw new Error('❌ RabbitMQ publish channel not established');
        return this._publishChannel;
    }

    async init(uri: string): Promise<void> {
        await this.connect(uri).then(async () => {
            await this.createChannel();
        });
    }

    async connect(uri: string): Promise<void> {
        return new Promise((resolve, reject) => {
            amqp.connect(uri)
                .then((connection) => {
                    this._connection = connection;
                    console.log('🐇 RabbitMQ connected');
                    resolve();
                })
                .catch((error) => {
                    console.error('❌ Error connecting to RabbitMQ:', error);
                    reject(error);
                });
        });
    }

    async createChannel(): Promise<void> {
        if (!this._connection) {
            throw new Error('RabbitMQ connection not established');
        }
        this._publishChannel = await this._connection.createChannel();
        console.log("📡 Publish channel created");
    }
}

const rabbitConnector = new RabbitConnector();

export default rabbitConnector;