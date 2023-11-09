import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserDto } from '../src/modules/user/dto/user.dto';
import { UserService } from '../src/modules/user/service/user.service';
import { JWT_CONFIG } from './auth.module';

interface UserPayload {
    id: number;
}

interface JwtMetadata {
    /** Issued at */
    iat: number;

    /** Expiration time */
    exp: number;

    /** Audience */
    aud: string;

    /** Issuer */
    iss: string;

    /** Subject (user who issued) */
    sub: string;
}

interface BasePayloadData {
    user?: UserPayload;
}

type AccessTokenPayloadData = BasePayloadData;

export type AccessTokenPayload = JwtMetadata & AccessTokenPayloadData;

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

		createUserDto.password = await bcrypt.hash(createUserDto.password);

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

    async validateUser(payload: BasePayloadData): Promise<IValidatedUser> {
        const user: User = await this.userService.findById(payload.user.id);

        return {
            ...user,
            id: payload.user.id,
        };
    }

}
