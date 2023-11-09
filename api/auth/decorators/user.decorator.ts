import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { IValidatedUser } from '../../auth/auth.service';

export const ReqUser = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();

    const user: IValidatedUser = (req as any).user;

    if (!user) {
        return null;
    }

    return user;
});
