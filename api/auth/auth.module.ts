import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModuleOptions, JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { readFileSync } from 'fs';
import { UserModule } from '../src/modules/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { Algorithm } from 'jsonwebtoken';

const {
    SEC_PRIVATE_KEY,
    SEC_PUBLIC_KEY,
    JWT_ALGORITHM,
    JWT_AUDIENCE,
	JWT_EXPIRATION_IN_SECONDS,
    SSO_ISSUER
} = process.env;

const algorithm: Algorithm = (JWT_ALGORITHM || 'RS256') as Algorithm;
export const JWT_CONFIG: JwtModuleOptions = {
    privateKey: readFileSync(SEC_PRIVATE_KEY, 'utf8'),
    publicKey: readFileSync(SEC_PUBLIC_KEY, 'utf8'),
    signOptions: {
		expiresIn: JWT_EXPIRATION_IN_SECONDS || 30 * 60,
        algorithm,
        issuer: SSO_ISSUER || 'FWS',
        audience: JWT_AUDIENCE || 'FWS'
    },
};

@Module({
    imports: [
        HttpModule,
        forwardRef(() => UserModule),
        JwtModule.register(JWT_CONFIG),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        LocalStrategy,
    ],
    exports: [
        AuthService,
        JwtStrategy,
        PassportModule,
    ],
})
export class AuthModule { }
