import { HttpError } from "@/lib/http-error";

export class CreateUser {
  async execute({ name, email }: { name: string; email: string }) {
    try {
      return { id: "1", name, email };
    } catch (error) {
      throw new HttpError("Erro ao criar o usuário.");
    }
  }
}

export const createUser = new CreateUser();
