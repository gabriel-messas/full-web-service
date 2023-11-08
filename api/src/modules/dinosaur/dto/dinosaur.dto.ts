import { IsString, IsNumber } from 'class-validator';


export class DinosaurDto {
	constructor(dinosaur?: Partial<DinosaurDto>) {
		if (dinosaur) {
			Object.assign(this, dinosaur);
		}
	}

	@IsString()
	species: string;

	@IsString()
	name: string;

	@IsNumber()
	age: number;
}
