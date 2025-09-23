import { Router } from "express";

export const routes = Router();

import { userController } from "@/core/controller/users.controller";

routes.get("/users", userController.index);
routes.get("/users/:id", userController.find);
routes.post("/users", userController.store);
routes.put("/users/:id", userController.update);
routes.delete("/users/:id", userController.delete);
