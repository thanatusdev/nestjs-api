import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Schedule } from './entities/schedule.entity';

@ApiTags('schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new schedule',
  })
  @ApiBody({ type: CreateScheduleDto })
  @ApiResponse({
    status: 201,
    description: 'The schedule has been successfully created.',
  })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all schedules' })
  @ApiResponse({
    status: 200,
    description: 'Return all schedules.',
    type: [Schedule],
  })
  findAll() {
    return this.schedulesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a schedule by id' })
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return a schedule by id.',
    type: Schedule,
  })
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a schedule' })
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateScheduleDto })
  @ApiResponse({
    status: 200,
    description: 'The schedule has been successfully updated.',
    type: Schedule,
  })
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.schedulesService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a schedule' })
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The schedule has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(id);
  }
}
