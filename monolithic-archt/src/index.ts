import app from "./app"
import { rabbitMQSetup } from "./events/setup";

const PORT = 3000;

const startServer = async () => {
    // setup rabbitMq connection
    await rabbitMQSetup();
    
    app.listen(PORT, () => {
        console.log('✅ Server is running on port', PORT);
    });
};

startServer();
