import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as fs from 'fs';
import RateLimit from 'express-rate-limit';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestApplicationOptions } from '@nestjs/common';

async function bootstrap() {
	const { NODE_ENV, PORT } = process.env;

    const currentMode = NODE_ENV || 'development';
    const isProductionMode = currentMode === 'production';

    const { SEC_PRIVATE_KEY, SEC_PUBLIC_KEY, SEC_PASSPHRASE } = process.env;

    const nestAppOptions: NestApplicationOptions = {
        httpsOptions: !isProductionMode && PORT === '443' ? {
            passphrase: SEC_PASSPHRASE !== null || SEC_PASSPHRASE !== '' ? SEC_PASSPHRASE : undefined,
            cert: fs.readFileSync(SEC_PUBLIC_KEY),
            key: fs.readFileSync(SEC_PRIVATE_KEY),
        } : undefined,
    };
	const app = await NestFactory.create<NestExpressApplication>(AppModule, nestAppOptions);

	if (isProductionMode) {
		const { RATELIMIT_WINDOW_MS, RATELIMIT_MAX_REQUESTS } = process.env;
		app.use(
			RateLimit({
				windowMs: parseInt(RATELIMIT_WINDOW_MS || '900000', 10),
				max: parseInt(RATELIMIT_MAX_REQUESTS || '100', 10),
			}),
		);

		app.set('trust proxy', 1);
	} else {
		const swaggerConfig = new DocumentBuilder()
			.setTitle('MyStudy API')
			.setVersion(process.env.npm_package_version)
			.addBearerAuth()
			.addCookieAuth('refresh_token', {
				type: 'apiKey',
				name: 'refresh',
				description: 'Uses refresh token saved on cookie',
			})
			.addApiKey()
			.addSecurity('rbac', {
				type: 'http',
				name: 'Role based access control',
				description: 'Only specific roles can access this endpoint'
			})
			.build();

		const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
		SwaggerModule.setup('docs', app, swaggerDocument);
	}

	app.use(passport.initialize());

	await app.listen(3000);
}
bootstrap();
