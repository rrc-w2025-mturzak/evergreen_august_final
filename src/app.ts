import express, {Express} from "express";
import impoundRouter from "./api/v1/routes/impoundRoutes";
import adminRouter from "./api/v1/routes/admin";
import morgan from "morgan";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorhandler";
import { limiter } from "./api/v1/config/rateLimitConfig";

const app: Express = express();

if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

app.use(express.json());
app.use(limiter)
app.use(morgan("combined"));
app.use("/api/v1/", impoundRouter);
app.use("/api/v1/", adminRouter);
app.use(errorHandler);

export default app;
