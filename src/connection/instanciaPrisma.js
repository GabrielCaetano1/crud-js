import { PrismaClient } from "@prisma/client";

class instanciaPrisma {
    static prisma = new PrismaClient();

    static getConnection() {
        if (!this.prisma) {
            this.prisma = new PrismaClient();
        }
        return this.prisma;
    }
}

export default instanciaPrisma;