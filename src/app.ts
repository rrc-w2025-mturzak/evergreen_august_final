import express, {Express} from "express";
import dotenv from "dotenv";
dotenv.config();
import impoundRouter from "./api/v1/routes/impoundRoutes";
import adminRouter from "./api/v1/routes/admin";
import morgan from "morgan";
import { getHelmetConfig } from "./api/v1/config/helmetConfig";
import cors from "cors";
import { getCorsOptions } from "./api/v1/config/corsConfig";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorhandler";
import { limiter } from "./api/v1/config/rateLimitConfig";
import setupSwagger from "./api/v1/config/swagger";

const app: Express = express();
app.use(getHelmetConfig());
app.use(cors(getCorsOptions()));

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
setupSwagger(app);
app.use("/api/v1/", impoundRouter);
app.use("/api/v1/", adminRouter);
app.use(errorHandler);

export default app;
