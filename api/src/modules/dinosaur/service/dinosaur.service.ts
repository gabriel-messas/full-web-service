import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Dinosaur } from '@prisma/client';
import { DinosaurRepository } from '../repository/dinosaur.repository';
import { DinosaurDto } from '../dto/dinosaur.dto';

@Injectable()
export class DinosaurService {
    constructor(
        @Inject(forwardRef(() => DinosaurRepository))
        private dinosaurRepository: DinosaurRepository,
    ) {	}

	async findAll(): Promise<Dinosaur[]> {
		return this.dinosaurRepository.findAll();
	}

	async findById(dinosaurId: number): Promise<Dinosaur> {
		return this.dinosaurRepository.findById(dinosaurId);
	}

	async create(dinosaur: DinosaurDto): Promise<Dinosaur> {
		return this.dinosaurRepository.create(dinosaur);
	}

	async update(dinosaurId: number, dinosaur: DinosaurDto): Promise<Dinosaur> {
		return this.dinosaurRepository.update(dinosaurId, dinosaur);
	}

	async delete(dinosaurId: number): Promise<Dinosaur> {
		return this.dinosaurRepository.delete(dinosaurId);
	}
}
