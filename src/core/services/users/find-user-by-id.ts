import { HttpError } from "@/lib/http-error";

export class FindUserById {
  async execute({ id }: { id: string }) {
    try {
      return { id };
    } catch (error) {
      throw new HttpError("Erro ao buscar o usuário.");
    }
  }
}

export const findUserById = new FindUserById();
