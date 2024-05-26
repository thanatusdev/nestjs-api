import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AbstractTasksRepository } from './repositories/tasks.repository.abstract';
import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: AbstractTasksRepository,
    private readonly prisma: PrismaService,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.$transaction(async (prismaTransaction) => {
      return this.tasksRepository.create(createTaskDto, prismaTransaction);
    });
  }

  findAll(where?: Prisma.TaskWhereInput) {
    return this.tasksRepository.findAll(where);
  }

  findOne(id: string) {
    return this.tasksRepository.findOne(id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.$transaction(async (prismaTransaction) => {
      return this.tasksRepository.update(id, updateTaskDto, prismaTransaction);
    });
  }

  remove(id: string) {
    return this.tasksRepository.remove(id);
  }
}
