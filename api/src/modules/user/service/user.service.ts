import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject(forwardRef(() => UserRepository))
        private userRepository: UserRepository,
    ) {}

    async findById(id: number) {
        return this.userRepository.findById(id);
    }

    // Only for login purposes
    async findByUsername(username: string) {
        return this.userRepository.findByUsername(username);
    }

	async create(user: UserDto) {
		return this.userRepository.create(user);
	}
}
