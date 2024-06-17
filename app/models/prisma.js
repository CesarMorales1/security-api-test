import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Configura el tamaño del pool de conexiones si es necesario
  // connection_limit: 10, // Ejemplo de configuración
});

export default prisma;