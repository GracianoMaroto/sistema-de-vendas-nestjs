import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário admin
  const passwordHash = await bcrypt.hash('admin', 10);

  await prisma.user.upsert({
    where: { email: 'admin@teste.com' },
    update: {}, // nada a atualizar
    create: {
      name: 'Admin',
      email: 'admin@teste.com',
      password: passwordHash,
      role: 'ADMIN',
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
