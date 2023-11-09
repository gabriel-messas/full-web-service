import { forwardRef, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';
import { LocalLoginService } from '../service/local-login.service';

interface IStrategyOptionsWithRequest {
    usernameField?: string;
    passwordField?: string;
    session?: boolean;
    passReqToCallback: true;
}

const options: IStrategyOptionsWithRequest = {
    passReqToCallback: true,
};

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {

    constructor(
        @Inject(forwardRef(() => LocalLoginService))
        private localLoginService: LocalLoginService,
    ) {
        super(options);
    }

    async validate(request: Request, username: string, password: string) {
        return this.localLoginService.validateUser(
            {
                username,
                password
            }
        );
    }

}
