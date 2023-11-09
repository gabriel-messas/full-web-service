import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs";

import { UserDto } from '../modules/user/dto/user.dto';
import { UserService } from '../modules/user/service/user.service';
import { JWT_CONFIG } from './auth.module';
import { AccessTokenPayload } from './strategy/jwt.strategy';

export type IValidatedUser = User;

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    async register(createUserDto: UserDto) {
        // check if user exists
        const user: any = await this.userService.findByUsername(createUserDto.username);
        if (user) {
            throw new BadRequestException('Username already registered');
        }

		createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

        return this.userService.create(createUserDto);
    }

    async login(user: { id: number, username: string }) {
        const payload = {
            user: {
                id: user.id,
                username: user.username,
            }
        };
        console.log('PAYLOAD TO BE SIGNED', payload);
        return {
            accessToken: this.jwtService.sign(payload),
			expiresIn: JWT_CONFIG.signOptions.expiresIn as number
        };
    }

    async validateUser(payload: AccessTokenPayload): Promise<IValidatedUser> {
        const user: User = await this.userService.findById(payload.user.id);

        return {
            ...user,
            id: payload.user.id,
        };
    }

}
