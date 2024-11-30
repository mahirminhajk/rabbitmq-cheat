import amqp from 'amqplib';

export class Amqp {
    static sendMessage = async (message: Object) => {
        // Connect to RabbitMQ server
        const connection = await amqp.connect('amqp://localhost');

        // Create a channel to send messages
        const channel = await connection.createChannel();

        // Declare exchange and queue
        const exchange = 'demo_exchange';
        const queue = 'demo_queue';
        const routingKey = 'demo.key';

        // Create exchange and queue
        await channel.assertExchange(exchange, 'direct', { durable: true });
        await channel.assertQueue(queue, { durable: true });

        // Bind queue to exchange
        await channel.bindQueue(queue, exchange, routingKey);

        // Send message to exchange
        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
    }

    static receiveMessage = async () => {
        // Connect to RabbitMQ server
        const connection = await amqp.connect('amqp://localhost');

        // Create a channel to receive messages
        const channel = await connection.createChannel();

        // Declare exchange and queue
        const queue = 'demo_queue';

        // Create queue
        await channel.assertQueue(queue, { durable: true });

        // Consume messages from queue
        channel.consume(queue, (message) => {
            if (message) console.log('Received message:', message.content.toString());
        }, { noAck: true });

    }

    static sendMess2 = async (exchange: string, routingKey: string, message: Object, service: string) => {
        // Connect to RabbitMQ server
        const connection = await amqp.connect('amqp://localhost');

        // Create a channel to send messages
        const channel = await connection.createChannel();

        // Create exchange and queue
        await channel.assertExchange(exchange, 'topic', { durable: true });

        // Send message to exchange
        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));

        console.log(service, ': Sent message:', message);
    }

    static sendMess3 = async (queue: string, message: Object, service: string, options:object) => {
        // Connect to RabbitMQ server
        const connection = await amqp.connect('amqp://localhost');

        // Create a channel to send messages
        const channel = await connection.createChannel();

        // Create queue
        await channel.assertQueue(queue, options);

        // Send message to queue
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

        console.log(service, ': Sent message:', message);
    }

    static receiveMess2 = async (exchange: string, queue: string, routingKey: string, service: string, time: number = 0) => {
        // Connect to RabbitMQ server
        const connection = await amqp.connect('amqp://localhost');

        // Create a channel to receive messages
        const channel = await connection.createChannel();

        // create exchange and queue
        await channel.assertExchange(exchange, 'topic', { durable: true });
        await channel.assertQueue(queue, { durable: true });

        await channel.bindQueue(queue, exchange, routingKey);

        // Consume messages from queue
        channel.consume(queue, (message) => {
            if (!message) return;

            // console.log(service, ': Received message:', message.content.toString());

            // Acknowledge message after random time
            setTimeout(() => {
                //* generate random number between 0 and 1
                const random = Math.floor(Math.random() * 2);

                if (random === 1) {
                    console.log(service, ': Received message:', message.content.toString());
                    channel.ack(message);
                } else {
                    console.log(service, ': Message not processed:', message.content.toString());
                    // channel.nack(message, false, false); // nothing will happen, just failed message
                    // channel.nack(message, true, false); // multiple message will not-ack, because one message is failed, this mean that we say this service is failed or down, reason one message is failed
                    // channel.nack(message, true, true); // requeue message 
                    // channel.reject(message, false); // not requeue message
                    channel.reject(message, true); // requeue message
                }
            }, time);

        }, { noAck: false });

    }

    static setupDLX = async () => { // dead letter exchange
        // Connect to RabbitMQ server
        const connection = await amqp.connect('amqp://localhost');

        // Create a channel to send messages
        const channel = await connection.createChannel();

        // Declare exchange and queue
        const exchange = 'dlx_exchange';
        const queue = 'dlx_queue';
        const routingKey = 'dlx.key';

        // Create exchange and queue
        await channel.assertExchange(exchange, 'direct', { durable: true });
        await channel.assertQueue(queue, { durable: true });

        // Bind queue to exchange
        await channel.bindQueue(queue, exchange, routingKey);

        channel.consume(queue, (message) => {
            if (!message) return;

            console.log('DLX Received message:', message.content.toString());
            channel.ack(message);
            console.log('Message acknowledged');
        }, { noAck: false });

        console.log('DLX setup completed');
    };

    static setupMainQueue = async () => {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const mainQueue = 'main_queue';

        await channel.assertQueue(mainQueue,
            {
                durable: true,
                arguments: {
                    'x-dead-letter-exchange': 'dlx_exchange',
                    'x-dead-letter-routing-key': 'dlx.key'
                },
            }
        );

        console.log('Main queue setup with Dead Letter Exchange');

        channel.consume(mainQueue, (message) => {
            if (!message) return;

            console.log('Main Queue Received message:', message.content.toString());
            // channel.reject(message, false);
            // console.log('Message rejected');

            //* sending extra info to DLX
            const rejectedMessage = {
                originalMessage: message.content.toString(), // The original message
                rejectionReason: 'Message processing failed due to X error', // The reason for rejection
                timestamp: new Date().toISOString() // Optionally include a timestamp
            };

            // Publish the rejected message to the DLX with extra information
            channel.publish('dlx_exchange', 'dlx.key', Buffer.from(JSON.stringify(rejectedMessage)));

            // Reject the message from the main queue (don't requeue)
            channel.reject(message, false);
            console.log('Message rejected and sent to DLX with extra info');

        }, { noAck: false });

    };

    static setupDelayQueue = async () => {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const delayQueue = 'delay_queue';

        await channel.assertQueue(delayQueue,
            {
                durable: true,
                arguments: {
                    'x-dead-letter-exchange': 'dlx_exchange',
                    'x-dead-letter-routing-key': 'dlx.key',
                    'x-message-ttl': 5000,
                    'x-expires': 10000,
                },
            }
        );

        await channel.consume(delayQueue, (message) => {
            if (!message) return;

            console.log('Delay Queue Received message:', message.content.toString());
            channel.ack(message);
            console.log('Message acknowledged');

        },{ noAck: false });

        console.log('Delay queue setup with Dead Letter Exchange');

    };

    static setupPriorityQueue = async () => {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const priorityQueue = 'priority_queue';

        await channel.assertQueue(priorityQueue,
            {
                durable: true,
                arguments: {
                    'x-max-priority': 10 // Set the maximum priority level to 10
                },
            }
        );

        await channel.consume(priorityQueue, (message) => {
            if (!message) return;

            console.log('Priority Queue Received message:', message.content.toString());
            channel.ack(message);
            console.log('Message acknowledged');

        },{ noAck: false });

        console.log('Priority queue setup with Dead Letter Exchange');
    };
}