import { Prisma } from '@prisma/client';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';

export abstract class AbstractTasksRepository {
  abstract create(
    createTaskDto: CreateTaskDto,
    prismaTransaction: Prisma.TransactionClient,
  ): Promise<Task>;
  abstract findAll(where?: Prisma.TaskWhereInput): Promise<Task[]>;
  abstract findOne(id: string): Promise<Task | null>;
  abstract update(
    id: string,
    updateAppointmentDto: UpdateTaskDto,
    prismaTransaction: Prisma.TransactionClient,
  ): Promise<Task>;
  abstract remove(id: string): Promise<Task>;
}
