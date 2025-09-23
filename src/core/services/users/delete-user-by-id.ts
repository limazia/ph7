import { HttpError } from "@/lib/http-error";

export class DeleteUserById {
  async execute({ id }: { id: string }) {
    try {
      return { id };
    } catch (error) {
      throw new HttpError("Erro ao buscar o usuário.");
    }
  }
}

export const deleteUserById = new DeleteUserById();
