import { prisma } from "@/lib/prisma";
import { User } from "@/core/model/users.model";
import { HttpError } from "@/lib/http-error";

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pages: number;
  limit: number;
  total?: number;
}

export class ListUsers {
  async execute(params: PaginationParams = {}): Promise<PaginatedResponse<User>> {
    try {
      const page = params.page || 1;
      const limit = params.limit || 10;
      const skip = (page - 1) * limit;

      // Contar total de usuários
      const total = await prisma.user.count();

      // Buscar usuários com paginação
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      });

      // Calcular número total de páginas
      const pages = Math.ceil(total / limit);

      return {
        data: users as User[],
        page,
        pages,
        limit,
        total,
      };
    } catch (error) {
      throw new HttpError("Erro ao listar os usuários", 500, "internal_error");
    }
  }
}

export const listUsers = new ListUsers();
