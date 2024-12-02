import app from "./app"
import { rabbitMQSetup } from "./event/setup";

const PORT = 3000;

const startServer = async () => {
    if (!process.env.ELASTICSEARCH_URL) {
        throw new Error('❌ ELASTICSEARCH_URL must be defined');
    }
    if (!process.env.ELASTICSEARCH_USERNAME) {
        throw new Error('❌ ELASTICSEARCH_USERNAME must be defined');
    }
    if (!process.env.ELASTICSEARCH_PASSWORD) {
        throw new Error('❌ ELASTICSEARCH_PASSWORD must be defined');
    }
    if (!process.env.REDIS_URL) {
        throw new Error('❌ REDIS_URL must be defined');
    }

    //* rabbitmq setup
    await rabbitMQSetup();

    app.listen(PORT, () => {
        console.log('🟩 Server is running on port', PORT);
    });
};

startServer();
