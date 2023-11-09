import { Module } from '@nestjs/common';
import { DinosaurModule } from './modules/dinosaur/dinosaur.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [
		DinosaurModule,
		UserModule,
		AuthModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
