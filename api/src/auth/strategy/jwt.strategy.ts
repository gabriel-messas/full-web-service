import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWT_CONFIG } from '../auth.module';
import { AuthService } from '../auth.service';

export const jwtExtractors = ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken()
]);

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

export type AccessTokenPayload = JwtMetadata & { user?: UserPayload };

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
		console.log('payload', payload);
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
