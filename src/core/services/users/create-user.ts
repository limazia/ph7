import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { CreateUserDto, User } from "@/core/model/users.model";
import { HttpError } from "@/lib/http-error";

export class CreateUser {
  async execute(data: CreateUserDto): Promise<User> {
    try {
      // Verificar se email já existe
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      });

      if (existingUser) {
        throw new HttpError("Email já está em uso", 400, "validation_error");
      }

      // Hash da senha
      const hashedPassword = await hashPassword(data.password);

      // Criar usuário
      const user = await prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
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
      throw new HttpError("Erro ao criar o usuário", 500, "internal_error");
    }
  }
}

export const createUser = new CreateUser();
