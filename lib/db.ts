// Every time aline of code is changed in development, a hot reload initializes a new prisma client.
// globalThis is not affected by hot reloads, so this saves a bucnh of initializations
import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
};

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
