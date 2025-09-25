import { prisma } from "@/lib/prisma";
import { UserParamsDto } from "@/core/model/users.model";
import { HttpError } from "@/lib/http-error";

export class DeleteUserById {
  async execute({ id }: UserParamsDto): Promise<void> {
    try {
      // Verificar se usuário existe
      const existingUser = await prisma.user.findUnique({
        where: { id }
      });

      if (!existingUser) {
        throw new HttpError("Usuário não encontrado", 404, "not_found");
      }

      // Deletar usuário
      await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError("Erro ao deletar o usuário", 500, "internal_error");
    }
  }
}

export const deleteUserById = new DeleteUserById();
