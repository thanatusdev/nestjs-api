import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { Prisma, Schedule } from '@prisma/client';
import { AbstractSchedulesRepository } from './schedules.repository.abstract';
import { UpdateScheduleDto } from '../dto/update-schedule.dto';

@Injectable()
export class SchedulesRepository implements AbstractSchedulesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.prisma.schedule.create({
      data: createScheduleDto,
    });
  }

  async findAll(where?: Prisma.ScheduleWhereInput) {
    return this.prisma.schedule.findMany({
      where: {
        ...where,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.schedule.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    return this.prisma.schedule.update({
      where: { id },
      data: {
        ...updateScheduleDto,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.schedule.delete({
      where: { id },
    });
  }
}
