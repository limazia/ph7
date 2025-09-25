import { z } from "zod";

// Enum do UserRole (mesmo que o Prisma)
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN"
}

// DTOs de entrada
export const createUserDto = z.object({
  email: z.string().email("Email inválido"),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  role: z.nativeEnum(UserRole).default(UserRole.USER),
});

export const updateUserDto = z.object({
  email: z.string().email("Email inválido").optional(),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").optional(),
  role: z.nativeEnum(UserRole).optional(),
});

export const userParamsDto = z.object({
  id: z.string().uuid("ID deve ser um UUID válido"),
});

export const paginationQueryDto = z.object({
  page: z.coerce.number().min(1, "Página deve ser maior que 0").default(1),
  limit: z.coerce.number().min(1, "Limite deve ser maior que 0").max(100, "Limite máximo é 100").default(10),
});

// Tipos inferidos dos DTOs
export type CreateUserDto = z.infer<typeof createUserDto>;
export type UpdateUserDto = z.infer<typeof updateUserDto>;
export type UserParamsDto = z.infer<typeof userParamsDto>;
export type PaginationQueryDto = z.infer<typeof paginationQueryDto>;

// DTO de resposta (sem senha) - Model/Interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
