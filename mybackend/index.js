import dotenv from "dotenv";
dotenv.config();  // Load environment variables first

import app from "./app.js";
import connectDB from "./config/connectDB.js";

const PORT = process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
});
