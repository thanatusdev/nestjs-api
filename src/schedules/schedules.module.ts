import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { AbstractSchedulesRepository } from './repositories/schedules.repository.abstract';
import { SchedulesRepository } from './repositories/schedules.repository';

@Module({
  controllers: [SchedulesController],
  providers: [
    SchedulesService,
    {
      provide: AbstractSchedulesRepository,
      useClass: SchedulesRepository,
    },
  ],
})
export class SchedulesModule {}
