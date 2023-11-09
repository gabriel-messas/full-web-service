import { IsString } from 'class-validator';


export class UserDto {
	constructor(user?: Partial<UserDto>) {
		if (user) {
			Object.assign(this, user);
		}
	}

	@IsString()
	name: string;
	
	@IsString()
	username: string;
	
	@IsString()
	password: string;
}
