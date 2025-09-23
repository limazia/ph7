import { HttpError } from "@/lib/http-error";

export class ListUsers {
  async execute() {
    try {
      return {
        users: []
      };
    } catch (error) {
      throw new HttpError("Erro ao buscar os usuários.");
    }
  }
}

export const listUsers = new ListUsers();
