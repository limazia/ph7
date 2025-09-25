 # PH7 - API de Usuários

Uma API RESTful simples e funcional para gerenciamento de usuários, construída com Node.js, TypeScript, Express, Prisma e PostgreSQL.

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- Docker e Docker Compose
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd ph7
```

2. Instale as dependências:
```bash
npm install
# ou use o package-new.json se necessário
# cp package-new.json package.json && npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Suba o banco de dados PostgreSQL com Docker:
```bash
npm run docker:up
```

5. Execute as migrações do banco:
```bash
npm run db:migrate
```

6. Gere o cliente Prisma:
```bash
npm run db:generate
```

7. (Opcional) Popular dados iniciais:
```bash
npm run db:seed
```

## 🏃‍♂️ Como usar

### Desenvolvimento
```bash
npm run dev
```

A API estará disponível em: `http://localhost:3000`
A documentação Swagger em: `http://localhost:3000/docs` (só em development)

### Produção
```bash
npm run build
npm start
```

### Outros comandos úteis
```bash
# Verificar código com ESLint
npm run lint

# Corrigir problemas de formatação
npm run lint:fix

# Visualizar dados no Prisma Studio
npm run db:studio

# Parar containers Docker
npm run docker:down
```

## 📚 API Documentation

### Swagger UI
Acesse `http://localhost:3000/api-docs` para ver a documentação interativa completa da API com:
- Schemas dos modelos
- Exemplos de requisições e respostas
- Testes interativos
- Descrição detalhada de cada endpoint

### Endpoints Resumidos

Base URL: `http://localhost:3000/api`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/users` | Listar todos os usuários |
| `GET` | `/users/:id` | Buscar usuário por ID |
| `POST` | `/users` | Criar novo usuário |
| `PUT` | `/users/:id` | Atualizar usuário |
| `DELETE` | `/users/:id` | Deletar usuário |

### Exemplos de uso

**Criar usuário:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "123456",
    "role": "USER"
  }'
```

**Resposta:**
```json
{
  "id": "cm123abc456def",
  "name": "João Silva",
  "email": "joao@email.com",
  "role": "USER",
  "createdAt": "2025-09-24T10:30:00.000Z",
  "updatedAt": "2025-09-24T10:30:00.000Z"
}
```

## 🗄️ Schema do Banco de Dados

### Tabela Users
```sql
id        String   @id @default(cuid())
email     String   @unique
name      String
password  String
role      UserRole @default(USER) -- USER | ADMIN
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
```

## 🏗️ Arquitetura do projeto

### DTOs (Data Transfer Objects)
```typescript
// Entrada - Criação
CreateUserDto: {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

// Entrada - Atualização
UpdateUserDto: {
  email?: string;
  name?: string;
  password?: string;
  role?: UserRole;
}

// Saída - Response (sem senha)
UserResponseDto: {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
```

### Estrutura de pastas
```
src/
├── config/          # Configurações (CORS, Swagger)
├── core/
│   ├── controller/  # Controllers com documentação Swagger
│   ├── model/       # Models, DTOs e validações Zod
│   └── services/    # Lógica de negócio
├── http/           # Rotas
├── lib/            # Utilitários (Prisma, Password, etc)
├── app.ts          # Inicialização
├── env.ts          # Configuração de ambiente
└── server.ts       # Configuração do Express + Swagger

prisma/
├── schema.prisma   # Schema do banco
├── migrations/     # Migrações
└── seed.ts         # Dados iniciais
```

## ⚙️ Configuração

### Swagger (só em desenvolvimento)
A documentação automática só fica disponível no ambiente de desenvolvimento:
- **Development**: `http://localhost:3000/docs`
- **Production**: Swagger desabilitado

### CORS
O arquivo `src/config/cors.ts` permite customizar as configurações de CORS:
```typescript
export const corsConfig: CorsOptions = {
  origin: "*", // Permite todas as origens
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};
```

### Swagger
O arquivo `src/config/swagger.ts` configura a documentação automática:
- OpenAPI 3.0
- UI customizada
- Schemas detalhados
- Exemplos interativos

### Variáveis de ambiente
```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ph7_db?schema=public"
```

## 🔒 Segurança

- Senhas são criptografadas com bcrypt
- Validação rigorosa com Zod DTOs
- Tratamento de erros personalizado
- Headers CORS configuráveis
- Sanitização de dados de saída (senha removida)

## 🧪 Tipos e Validação

### DTOs vs Schemas
- **DTOs**: Definem contratos de entrada e saída da API
- **Validação**: Zod schemas integrados aos DTOs
- **Type Safety**: TypeScript em toda a aplicação
- **Prisma Types**: Integração nativa com tipos do banco

### Exemplo prático:
```typescript
// DTO de entrada é validado
const validation = createUserDto.safeParse(request.body);

// Service recebe tipo seguro
const user = await createUser.execute(validation.data);

// Response é tipada (sem senha)
return response.json(user as UserResponseDto);
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
 