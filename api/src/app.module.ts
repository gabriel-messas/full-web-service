import { Module } from '@nestjs/common';
import { DinosaurModule } from './modules/dinosaur/dinosaur.module';

@Module({
	imports: [
		DinosaurModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
