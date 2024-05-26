import { Injectable } from '@nestjs/common';

import { Prisma, TaskType } from '@prisma/client';

import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';
import { AbstractTasksRepository } from './tasks.repository.abstract';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TasksRepository implements AbstractTasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        type: createTaskDto.type === 'work' ? TaskType.WORK : TaskType.BREAK,
      } as unknown as Prisma.TaskCreateInput,
    }) as unknown as Task;
  }

  async findAll(where?: Prisma.TaskWhereInput) {
    return this.prisma.task.findMany({
      where: {
        ...where,
      },
    }) as unknown as Task[];
  }

  async findOne(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
    }) as unknown as Task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        ...updateTaskDto,
        type: updateTaskDto.type === 'work' ? TaskType.WORK : TaskType.BREAK,
      } as unknown as Prisma.TaskUpdateInput,
    }) as unknown as Task;
  }

  async remove(id: string) {
    return this.prisma.task.delete({
      where: { id },
    }) as unknown as Task;
  }
}
