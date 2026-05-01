const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer() {
    try {
        // ✅ LẤY client
        const client = await MongoDB.connect(config.db.uri);

        console.log("Connected to the database!");

        // ✅ QUAN TRỌNG NHẤT (bạn đang thiếu)
        app.set("dbClient", client);

        // Khởi động server
        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
}

startServer();