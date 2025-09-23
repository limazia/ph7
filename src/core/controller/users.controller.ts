import { Request, Response } from "express";

import {
  createUser,
  deleteUserById,
  findUserById,
  listUsers,
  updateUserById,
} from "@/core/services/users";

class UserController {
  async index(request: Request, response: Response) {
    const users = await listUsers.execute();

    return response.status(200).json(users);
  }

  async find(request: Request, response: Response) {
    const { id } = request.params;

    const user = await findUserById.execute({ id });

    return response.status(200).json(user);
  }

  async store(request: Request, response: Response) {
    const user = await createUser.execute(request.body);

    return response.status(200).json(user);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    await updateUserById.execute({ id });

    return response.status(200).json({ message: "User updated successfully" });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await deleteUserById.execute({ id });

    return response.status(204).json({ message: "User deleted successfully" });
  }
}

export const userController = new UserController();
