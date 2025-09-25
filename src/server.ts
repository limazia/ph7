import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { corsConfig } from "@/config/cors";
import { setupSwagger } from "@/config/swagger";
import { routes } from "@/http/routes";
import { HttpError } from "@/lib/http-error";

const server = express();

server.use(cors(corsConfig));
server.use(bodyParser.json());

setupSwagger(server);

server.use(routes);

server.use(
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

    console.error("Internal server error:", error);

    return response.status(500).json({
      statusCode: 500,
      type: "error",
      message: "Internal server error",
    });
  }
);

export { server };
