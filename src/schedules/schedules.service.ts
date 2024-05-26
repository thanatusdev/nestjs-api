import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { AbstractSchedulesRepository } from './repositories/schedules.repository.abstract';
import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly schedulesRepository: AbstractSchedulesRepository,
    private readonly prisma: PrismaService,
  ) {}

  create(createScheduleDto: CreateScheduleDto) {
    return this.prisma.$transaction(async (prismaTransaction) => {
      return this.schedulesRepository.create(
        createScheduleDto,
        prismaTransaction,
      );
    });
  }

  findAll(where?: Prisma.ScheduleWhereInput) {
    return this.schedulesRepository.findAll(where);
  }

  findOne(id: string) {
    return this.schedulesRepository.findOne(id);
  }

  update(id: string, updateScheduleDto: UpdateScheduleDto) {
    return this.prisma.$transaction(async (prismaTransaction) => {
      return this.schedulesRepository.update(
        id,
        updateScheduleDto,
        prismaTransaction,
      );
    });
  }

  remove(id: string) {
    return this.schedulesRepository.remove(id);
  }
}
