import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';

@Module({
    imports: [],
    controllers: [],
    providers: [
        UserService,
		UserRepository
    ],
})
export class UserModule {}
