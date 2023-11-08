import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { DinosaurController } from './controller';
import { DinosaurRepository } from './repository';
import { DinosaurService } from './service';

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
