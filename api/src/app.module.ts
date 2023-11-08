import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DinosaurModule } from './modules/dinosaur/dinosaur.module';

@Module({
	imports: [
		DinosaurModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
