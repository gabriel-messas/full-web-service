import { Injectable } from '@nestjs/common';
import { Dinosaur, PrismaClient } from '@prisma/client';
import { DinosaurDto } from '../dto/dinosaur.dto';

@Injectable()
export class DinosaurRepository {

    constructor(
        private prisma: PrismaClient
    ) { }
	
	async findAll(): Promise<Dinosaur[]> {
		return this.prisma.dinosaur.findMany();
	}

	async findById(dinosaurId: number): Promise<Dinosaur> {
		return this.prisma.dinosaur.findUnique({
			where: {
				id: dinosaurId
			}
		});
	}

    async create(data: DinosaurDto): Promise<Dinosaur> {
		return this.prisma.dinosaur.create({ data });
	}

	async update(dinosaurId: number, data: DinosaurDto): Promise<Dinosaur> {
		return this.prisma.dinosaur.update({
			where: {
				id: dinosaurId
			},
			data
		});
	}

	async delete(dinosaurId: number): Promise<Dinosaur> {
		return this.prisma.dinosaur.delete({
			where: {
				id: dinosaurId
			}
		});
	}
}
