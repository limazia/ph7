import { randomUUID } from "crypto";
import { prisma } from "../src/lib/prisma";
import { hashPassword } from "../src/lib/password";
import { UserRole } from "../src/core/model/users.model";

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // Criar usuário admin
  const adminPassword = await hashPassword("admin123");
  const admin = await prisma.user.upsert({
    where: { email: "admin@ph7.com" },
    update: {},
    create: {
      id: randomUUID(), // UUID gerado dinamicamente
      email: "admin@ph7.com",
      name: "Administrador",
      password: adminPassword,
      role: UserRole.ADMIN,
    },
  });

  // Criar usuário comum
  const userPassword = await hashPassword("user123");
  const user = await prisma.user.upsert({
    where: { email: "user@ph7.com" },
    update: {},
    create: {
      id: randomUUID(), // UUID gerado dinamicamente
      email: "user@ph7.com",
      name: "Usuário Comum",
      password: userPassword,
      role: UserRole.USER,
    },
  });

  console.log("✅ Seed concluído!");
  console.log("👤 Admin criado:", { id: admin.id, email: admin.email });
  console.log("👤 Usuário criado:", { id: user.id, email: user.email });
  console.log("\n📝 Credenciais:");
  console.log("Admin - Email: admin@ph7.com | Senha: admin123");
  console.log("User - Email: user@ph7.com | Senha: user123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Erro durante o seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });