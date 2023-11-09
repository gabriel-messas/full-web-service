import { Controller, Logger, Post, Body, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { AuthService, IValidatedUser } from './auth.service';
import { UserDto } from '../src/modules/user/dto/user.dto';
import { ReqUser } from './decorators/user.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    private readonly logger: Logger = new Logger(AuthController.name);

    constructor(
        private authService: AuthService,
    ) { }

    // Login Endpoints

    @Post('register')
    @ApiOperation({ description: 'Register a user.' })
    register(@Body() body: UserDto) {
        return this.authService.register(body);
    }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    @ApiOperation({ description: 'Logs into the application using local login' })
	@ApiBody({
        description: 'User credentials',
        schema: {
            properties: {
				username: {
					type: 'string'
				},
				password: {
					type: 'string'
				}
            }
        }
    })
    @ApiOkResponse({ description: 'Access JWT token' })
    async customLogin(
        @ReqUser() user: IValidatedUser,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { accessToken, expiresIn } = await this.authService.login(user);

        this.logger.log(`Token generated for custom-login user ${user.username}, expires in ${expiresIn / 60} minutes.`);

        return { accessToken, expiresIn };
    }
}
