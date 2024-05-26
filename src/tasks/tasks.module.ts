import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { AbstractTasksRepository } from './repositories/tasks.repository.abstract';
import { TasksRepository } from './repositories/tasks.repository';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: AbstractTasksRepository,
      useClass: TasksRepository,
    },
  ],
})
export class TasksModule {}
