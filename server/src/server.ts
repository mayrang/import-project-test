import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { AppDataSource } from "./data-source";

import postsRoutes from "./routes/posts";
import authRoutes from "./routes/auth";
import commentsRoutes from "./routes/comments";
import applicationRoutes from "./routes/application";
import adminRoutes from "./routes/admin";
import reservationRoutes from "./routes/reservation";

const app = express();

dotenv.config();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reservation", reservationRoutes);

let port = 4000;

app.listen(port, async () => {
    console.log(`Server running ${port} Port`);
    AppDataSource.initialize()
    .then(() => {
        console.log("database init");
    })
    .catch((err) => {
        console.log(err);
    })
})