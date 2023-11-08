import { Controller, UseGuards, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { Dinosaur } from '@prisma/client';
import { UpdateDinosaurDto } from '../dto/update-user.dto';
import { DinosaurDto } from '../dto/user.dto';
import { DinosaurService } from '../service/user.service';
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
        @Param('dinosaurId') dinosaurId: string,
    ) {
        return this.dinosaurService.getDinosaur(dinosaurId);
    }

    @Post()
    @ApiOperation({ description: 'Creates a new dinosaur.' })
    createDinosaur(
        @Body() dinosaur: DinosaurDto,
    ): Promise<Dinosaur> {
        return this.dinosaurService.createDinosaur(dinosaur);
    }

    @Patch(':dinosaurId')
    @ApiOperation({ description: 'Updates a dinosaur.' })
    @ApiParam({ name: 'dinosaurId', description: 'Id of the dinosaur to update' })
    @ApiOkResponse({ description: 'Updated dinosaur information' })
    updateDinosaur(
        @Param('dinosaurId') dinosaurId: string,
        @Body() dinosaur: UpdateDinosaurDto,
    ): Promise<Dinosaur> {
        return this.dinosaurService.updateDinosaur(dinosaurId, dinosaur);
    }
}
