import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserDto } from '../dto/user.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class UserRepository {

    constructor(
        private prisma: PrismaService
    ) { }

	async findById(userId: number): Promise<User> {
		return this.prisma.user.findUnique({
			where: {
				id: userId
			}
		});
	}

	async findByUsername(userUsername: string): Promise<User> {
		return this.prisma.user.findUnique({
			where: {
				username: userUsername
			}
		});
	}

    async create(data: UserDto): Promise<User> {
		return this.prisma.user.create({ data });
	}
}
