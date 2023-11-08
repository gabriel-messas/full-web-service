import { Controller, UseGuards, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { Dinosaur } from '@prisma/client';
import { DinosaurDto } from '../dto/dinosaur.dto';
import { DinosaurService } from '../service/dinosaur.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('dinosaur')
@UseGuards(AuthGuard('jwt'))
@ApiTags('dinosaur')
@ApiBearerAuth()
export class DinosaurController {

    constructor(
        private readonly dinosaurService: DinosaurService,
    ) { }

    @Get()
    @ApiOperation({ description: 'Gets all dinosaurs' })
    @ApiOkResponse({ description: 'List of all dinosaurs', type: DinosaurDto, isArray: true })
    findAll() {
        return this.dinosaurService.findAll();
    }

	@Get(':dinosaurId')
    @ApiOperation({ description: 'Retrieves dinosaur information' })
    @ApiParam({ name: 'dinosaurId', description: 'Id of the dinosaur to retrieve' })
    @ApiOkResponse({ description: 'Dinosaur information' })
    findDinosaurById(
        @Param('dinosaurId') dinosaurId: number,
    ) {
        return this.dinosaurService.findById(dinosaurId);
    }

    @Post()
    @ApiOperation({ description: 'Creates a new dinosaur.' })
    createDinosaur(
        @Body() dinosaur: DinosaurDto,
    ): Promise<Dinosaur> {
        return this.dinosaurService.create(dinosaur);
    }

    @Patch(':dinosaurId')
    @ApiOperation({ description: 'Updates a dinosaur.' })
    @ApiParam({ name: 'dinosaurId', description: 'Id of the dinosaur to update' })
    @ApiOkResponse({ description: 'Updated dinosaur information' })
    updateDinosaur(
        @Param('dinosaurId') dinosaurId: number,
        @Body() dinosaur: DinosaurDto,
    ): Promise<Dinosaur> {
        return this.dinosaurService.update(dinosaurId, dinosaur);
    }
}
