import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoute";
import userRoutes from "./routes/userRoute";
import purchaseRoutes from "./routes/purchaseRoute";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./configs/database";
import { errorMiddleware } from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/purchases", purchaseRoutes);

app.use(errorMiddleware);

(async () => {
    try {
        await connectDatabase();
        app.listen(PORT, () => console.log(chalk.green(`${PORT} Port server is running...`)));
    } 
    catch (err) {
        console.error(chalk.red("Database connection failed:", err));
        process.exit(1); 
    }
})();

export default app;

