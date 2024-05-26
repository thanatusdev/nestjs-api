import { Prisma } from '@prisma/client';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { Schedule } from '../entities/schedule.entity';
import { UpdateScheduleDto } from '../dto/update-schedule.dto';

export abstract class AbstractSchedulesRepository {
  abstract create(
    createScheduleDto: CreateScheduleDto,
    prismaTransaction: Prisma.TransactionClient,
  ): Promise<Schedule>;
  abstract findAll(where?: Prisma.ScheduleWhereInput): Promise<Schedule[]>;
  abstract findOne(id: string): Promise<Schedule | null>;
  abstract update(
    id: string,
    updateAppointmentDto: UpdateScheduleDto,
    prismaTransaction: Prisma.TransactionClient,
  ): Promise<Schedule>;
  abstract remove(id: string): Promise<Schedule>;
}
