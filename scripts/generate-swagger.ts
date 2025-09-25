import { config } from "dotenv";
import { join } from "path";
import swaggerJSDoc from "swagger-jsdoc";
import { writeFileSync } from "fs";

config({
  path: join(process.cwd(), ".env"),
});

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PH7 API",
      version: "1.0.0",
      description: "API RESTful para gerenciamento de usuários",
      contact: {
        name: "PH7 Team",
        email: "contact@ph7.com",
      },
    },
    servers: [
      {
        url: `${process.env.HOST || 'http://localhost'}:${process.env.PORT || 4000}`,
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
        // Schemas aqui...
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

// Gerar arquivo swagger.json
const swaggerFile = join(process.cwd(), 'swagger.json');
writeFileSync(swaggerFile, JSON.stringify(specs, null, 2));
console.log('✅ Swagger file generated at swagger.json');