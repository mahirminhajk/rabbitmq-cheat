import app from "./app"

const PORT = 3001;

const startServer = async () => {
    app.listen(PORT, () => {
        console.log('Server is running on port', PORT);
    });
};

startServer();