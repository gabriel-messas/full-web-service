import { Injectable } from '@nestjs/common';
import { Dinosaur } from '@prisma/client';
import { DinosaurDto } from '../dto/dinosaur.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class DinosaurRepository {

    constructor(
        private prisma: PrismaService
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
