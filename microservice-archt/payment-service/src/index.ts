import app from "./app"
import { rabbitMQSetup } from "./event/setup";

const PORT = 3000;

const startServer = async () => {

    //* rabbitmq setup
    await rabbitMQSetup();

    app.listen(PORT, () => {
        console.log('Server is running on port', PORT);
    });
};

startServer();
