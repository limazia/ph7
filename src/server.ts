import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { routes } from "@/http/routes";
import { HttpError } from "@/lib/http-error";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);

app.use(
  async (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (error instanceof HttpError) {
      return response.status(error.statusCode).json({
        statusCode: error.statusCode,
        type: error.type,
        message: error.message,
      });
    }

    return response.status(500).json({
      statusCode: 500,
      type: "error",
      message: "Internal server error",
    });
  }
);

export { app };
