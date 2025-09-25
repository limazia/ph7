import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { User, UserParamsDto, UpdateUserDto } from "@/core/model/users.model";
import { HttpError } from "@/lib/http-error";

export class UpdateUserById {
  async execute(id: string, data: UpdateUserDto): Promise<User> {
    try {
      // Verificar se usuário existe
      const existingUser = await prisma.user.findUnique({
        where: { id }
      });

      if (!existingUser) {
        throw new HttpError("Usuário não encontrado", 404, "not_found");
      }

      // Verificar se email já está em uso por outro usuário
      if (data.email) {
        const emailInUse = await prisma.user.findFirst({
          where: {
            email: data.email,
            id: { not: id }
          }
        });

        if (emailInUse) {
          throw new HttpError("Email já está em uso", 400, "validation_error");
        }
      }

      // Hash da nova senha se fornecida
      let updateData: any = { ...data };
      if (data.password) {
        updateData.password = await hashPassword(data.password);
      }

      // Atualizar usuário
      const user = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user as User;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError("Erro ao atualizar o usuário", 500, "internal_error");
    }
  }
}

export const updateUserById = new UpdateUserById();
