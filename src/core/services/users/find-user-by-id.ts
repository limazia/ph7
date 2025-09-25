import { prisma } from "@/lib/prisma";
import { User, UserParamsDto } from "@/core/model/users.model";
import { HttpError } from "@/lib/http-error";

export class FindUserById {
  async execute({ id }: UserParamsDto): Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        throw new HttpError("Usuário não encontrado", 404, "not_found");
      }

      return user as User;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError("Erro ao buscar o usuário", 500, "internal_error");
    }
  }
}

export const findUserById = new FindUserById();
