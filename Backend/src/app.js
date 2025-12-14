import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(
    express.urlencoded({
        limit: "20kb",
    })
);

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

export { app };