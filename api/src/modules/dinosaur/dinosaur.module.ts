import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { DinosaurController } from './controller/dinosaur.controller';
import { DinosaurService } from './service/dinosaur.service';
import { DinosaurRepository } from './repository/dinosaur.repository';
import { PrismaClient } from '@prisma/client';

@Module({
    imports: [
        HttpModule,
    ],
    controllers: [
        DinosaurController,
    ],
    providers: [
        DinosaurService,
        DinosaurRepository
    ],
    exports: [
        DinosaurService,
        DinosaurRepository
    ],
})
export class DinosaurModule { }
