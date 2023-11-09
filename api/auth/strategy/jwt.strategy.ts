import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWT_CONFIG } from '../auth.module';
import { AccessTokenPayload, AuthService } from '../auth.service';

export const jwtExtractors = ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken()
]);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: jwtExtractors,
            secretOrKey: JWT_CONFIG.publicKey,
            algorithms: [JWT_CONFIG.signOptions.algorithm],
            issuer: JWT_CONFIG.signOptions.issuer,
            audience: JWT_CONFIG.signOptions.audience,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: AccessTokenPayload) {
        if (!payload) {
            throw new UnauthorizedException();
        }

        try {
            if ('user' in payload) {
                return this.authService.validateUser(payload);
            }
        } catch (err) {
            throw new UnauthorizedException();
        }
    }
}
