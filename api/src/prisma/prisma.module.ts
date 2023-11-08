import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
    providers: [
        {
            provide: PrismaService,
            useFactory: async () => {
                const prisma = new PrismaService();
                await prisma.$connect();
                return prisma;
            }
        }
    ],
    exports: [ PrismaService ]
})
export class PrismaModule {}
