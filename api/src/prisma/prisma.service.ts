import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import { createPrismaRedisCache } from 'prisma-redis-middleware';

const {
    REDIS_HOST,
    REDIS_PORT,
    REDIS_USERNAME,
    REDIS_PASSWORD
} = process.env;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super();
	}

	async onModuleInit() {
        const redisHost = REDIS_HOST ?? 'localhost';
        const redisPort = parseInt(REDIS_PORT ?? '6379', 10);
        const redisUser = REDIS_USERNAME ?? '';
        const redisPass = REDIS_PASSWORD ?? '';

        const redisClient = new Redis(
            {
                host: redisHost,
                port: redisPort,
                username: redisUser,
                password: redisPass,
                keyPrefix: 'db-cache:'
            },
        );

		const cacheMiddleware: Prisma.Middleware = createPrismaRedisCache({
			models: [
				{ model: "Dinosaur" },
			],
			storage: {
				type: "redis",
				options: {
					client: redisClient,
					invalidation: {
						referencesTTL: 300
					},
					log: console
				}
			},
			cacheTime: 300,
			excludeModels: [],
			excludeMethods: ["count", "groupBy"],
			onHit: (key) => {
				console.log("hit", key);
			},
			onMiss: (key) => {
				console.log("miss", key);
			},
			onError: (key) => {
				console.log("error", key);
			},
		});

		this.$use(cacheMiddleware);

		await this.$connect();
  	}

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
