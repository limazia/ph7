import { prisma } from "@/lib/prisma";
import { PaginationQueryDto, User } from "@/core/model/users.model";
import { HttpError } from "@/lib/http-error";

export interface PaginatedResponse<T> extends PaginationQueryDto {
  data: T[];
  pages: number;
  total?: number;
}

export class ListUsers {
  async execute(params: PaginationQueryDto): Promise<PaginatedResponse<User>> {
    try {
      const page = params.page;
      const limit = params.limit;
      const skip = (page - 1) * limit;

      const [total, users] = await Promise.all([
        prisma.user.count(),
        prisma.user.findMany({
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            createdAt: "asc",
          },
          skip,
          take: limit,
        }),
      ]);

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
      throw new HttpError("Erro ao listar os usuários", 500, "ERROR_LISTING_USERS");
    }
  }
}

export const listUsers = new ListUsers();
