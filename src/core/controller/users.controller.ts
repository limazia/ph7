import { Request, Response } from "express";
import { CreateUser } from "@/core/services/users/create-user";
import { findUserById } from "@/core/services/users/find-user-by-id";
import { updateUserById } from "@/core/services/users/update-user-by-id";
import { deleteUserById } from "@/core/services/users/delete-user-by-id";
import { listUsers } from "@/core/services/users/users";
import {
  createUserDto,
  updateUserDto,
  userParamsDto,
  paginationQueryDto,
} from "@/core/model/users.model";

class UserController {
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Listar todos os usuários
   *     tags: [Users]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *           default: 1
   *         description: Número da página
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *           default: 10
   *         description: Número de itens por página
   *     responses:
   *       200:
   *         description: Lista de usuários retornada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PaginatedUsersResponse'
   *       400:
   *         description: Parâmetros de paginação inválidos
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Erro interno do servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  async index(request: Request, response: Response) {
    const validation = paginationQueryDto.safeParse(request.query);

    if (!validation.success) {
      return response.status(400).json({
        statusCode: 400,
        type: "validation_error",
        message: "Parâmetros de paginação inválidos",
        errors: validation.error.errors,
      });
    }

    const result = await listUsers.execute(validation.data);
    return response.status(200).json(result);
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Buscar usuário por ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID único do usuário
   *     responses:
   *       200:
   *         description: Usuário encontrado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: ID inválido
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       404:
   *         description: Usuário não encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  async find(request: Request, response: Response) {
    const validation = userParamsDto.safeParse({ id: request.params.id });

    if (!validation.success) {
      return response.status(400).json({
        statusCode: 400,
        type: "validation_error",
        message: "ID inválido",
        errors: validation.error.errors,
      });
    }

    const user = await findUserById.execute(validation.data);
    return response.status(200).json(user);
  }

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Criar novo usuário
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Dados inválidos ou email já em uso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Erro interno do servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  async store(request: Request, response: Response) {
    const validation = createUserDto.safeParse(request.body);

    if (!validation.success) {
      return response.status(400).json({
        statusCode: 400,
        type: "validation_error",
        message: "Dados inválidos",
        path: validation.error.errors,
      });
    }

    const createUser = new CreateUser();
    const user = await createUser.execute(validation.data);

    return response.status(201).json(user);
  }

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Atualizar usuário
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID único do usuário
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserInput'
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Dados inválidos, ID inválido ou email já em uso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       404:
   *         description: Usuário não encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  async update(request: Request, response: Response) {
    const idValidation = userParamsDto.safeParse({ id: request.params.id });

    if (!idValidation.success) {
      return response.status(400).json({
        statusCode: 400,
        type: "validation_error",
        message: "ID inválido",
        errors: idValidation.error.errors,
      });
    }

    const bodyValidation = updateUserDto.safeParse(request.body);

    if (!bodyValidation.success) {
      return response.status(400).json({
        statusCode: 400,
        type: "validation_error",
        message: "Dados inválidos",
        errors: bodyValidation.error.errors,
      });
    }

    const user = await updateUserById.execute(
      idValidation.data.id,
      bodyValidation.data
    );

    return response.status(200).json(user);
  }

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Deletar usuário
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID único do usuário
   *     responses:
   *       204:
   *         description: Usuário deletado com sucesso
   *       400:
   *         description: ID inválido
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       404:
   *         description: Usuário não encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  async delete(request: Request, response: Response) {
    const validation = userParamsDto.safeParse({ id: request.params.id });

    if (!validation.success) {
      return response.status(400).json({
        statusCode: 400,
        type: "validation_error",
        message: "ID inválido",
        errors: validation.error.errors,
      });
    }

    await deleteUserById.execute(validation.data);

    return response.status(204).send();
  }
}

export const userController = new UserController();
