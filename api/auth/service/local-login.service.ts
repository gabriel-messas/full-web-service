import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../../src/modules/user/service/user.service';
import { User } from '@prisma/client';

@Injectable()
export class LocalLoginService {

    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
    ) {}

    async validateUser(
        loginDto: LoginDto,
    ): Promise<User> {
		const user = await this.userService.findByUsername(loginDto.username);
		if (user && await bcrypt.compare(loginDto.password, user.password)) {
			return user;
		}
		return null;
    }

}
