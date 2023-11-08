import { Module } from '@nestjs/common';
import { DinosaurModule } from './modules/dinosaur/dinosaur.module';
import { PrismaClient } from '@prisma/client';

@Module({
	imports: [
		DinosaurModule
	],
	controllers: [],
	providers: [
		PrismaClient
	],
})
export class AppModule {}
