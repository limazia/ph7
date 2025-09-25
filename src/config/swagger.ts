import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express, Request, Response, NextFunction } from "express";
import { writeFileSync } from "fs";
import { join } from "path";

import { version } from "../../package.json";

import { env } from "@/env";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PH7 API",
      version,
      description: "API RESTful para gerenciamento de usuários",
      contact: {
        name: "PH7 Team",
        email: "contact@ph7.com",
      },
    },
    servers: [
      {
        url: `${env.HOST}:${env.PORT}`,
        description: "Servidor de desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        basicAuth: {
          type: "http",
          scheme: "basic",
          description: "Autenticação básica com usuário e senha"
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "ID único do usuário",
              example: "cm123abc456def",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email do usuário",
              example: "usuario@email.com",
            },
            name: {
              type: "string",
              description: "Nome completo do usuário",
              example: "João Silva",
            },
            role: {
              type: "string",
              enum: ["USER", "ADMIN"],
              description: "Papel do usuário no sistema",
              example: "USER",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Data de criação",
              example: "2025-09-24T10:30:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Data da última atualização",
              example: "2025-09-24T10:30:00.000Z",
            },
          },
        },
        PaginatedUsersResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/User",
              },
              description: "Lista de usuários",
            },
            page: {
              type: "number",
              description: "Página atual",
              example: 1,
            },
            pages: {
              type: "number",
              description: "Total de páginas",
              example: 5,
            },
            limit: {
              type: "number",
              description: "Limite de itens por página",
              example: 10,
            },
            total: {
              type: "number",
              description: "Total de registros",
              example: 50,
            },
          },
        },
        CreateUserInput: {
          type: "object",
          required: ["email", "name", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "Email do usuário",
              example: "usuario@email.com",
            },
            name: {
              type: "string",
              minLength: 2,
              description: "Nome completo do usuário",
              example: "João Silva",
            },
            password: {
              type: "string",
              minLength: 6,
              description: "Senha do usuário",
              example: "123456",
            },
            role: {
              type: "string",
              enum: ["USER", "ADMIN"],
              description: "Papel do usuário no sistema",
              example: "USER",
              default: "USER",
            },
          },
        },
        UpdateUserInput: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "Email do usuário",
              example: "usuario@email.com",
            },
            name: {
              type: "string",
              minLength: 2,
              description: "Nome completo do usuário",
              example: "João Silva",
            },
            password: {
              type: "string",
              minLength: 6,
              description: "Nova senha do usuário",
              example: "123456",
            },
            role: {
              type: "string",
              enum: ["USER", "ADMIN"],
              description: "Papel do usuário no sistema",
              example: "USER",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            statusCode: {
              type: "number",
              description: "Código de status HTTP",
              example: 400,
            },
            type: {
              type: "string",
              description: "Tipo do erro",
              example: "validation_error",
            },
            message: {
              type: "string",
              description: "Mensagem do erro",
              example: "Dados inválidos",
            },
            errors: {
              type: "array",
              description: "Detalhes dos erros de validação",
              items: {
                type: "object",
              },
            },
          },
        },
      },
    },
    security: [
      {
        basicAuth: [],
      },
    ],
    tags: [
      {
        name: "Users",
        description: "Operações relacionadas aos usuários",
      },
    ],
  },
  apis: ["./src/http/routes.ts", "./src/core/controller/*.ts"],
};

const specs = swaggerJSDoc(options);

// Função para autenticação básica
const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  
  if (!auth || !auth.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Swagger Documentation"');
    return res.status(401).json({ message: 'Authentication required' });
  }

  const credentials = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
  const username = credentials[0];
  const password = credentials[1];

  if (username !== env.SWAGGER_USERNAME || password !== env.SWAGGER_PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  next();
};

// Função para gerar arquivo swagger.json
const generateSwaggerFile = () => {
  const swaggerFile = join(process.cwd(), 'swagger.json');
  writeFileSync(swaggerFile, JSON.stringify(specs, null, 2));
  console.log('📄 Swagger file generated at swagger.json');
};

export const setupSwagger = (app: Express) => {
  // Só habilitar Swagger no development
  if (env.NODE_ENV === "development") {
    // Gerar arquivo swagger.json automaticamente
    generateSwaggerFile();
    
    // Middleware de autenticação para todas as rotas /docs*
    app.use("/docs*", basicAuth);
    
    // Setup do Swagger
    app.use(
      "/docs",
      (swaggerUi.serve as any),
      (swaggerUi.setup as any)(specs, {
        customCss: ".swagger-ui .topbar { display: none }",
        customSiteTitle: "PH7 API Documentation",
      })
    );

    console.log(
      `📄 Access the documentation on ${env.HOST}:${env.PORT}${env.SWAGGER_PATH}`
    );
    console.log(`🔐 Use credentials: ${env.SWAGGER_USERNAME} / ${env.SWAGGER_PASSWORD}`);
  }
};
