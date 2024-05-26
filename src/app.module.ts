import { Module } from '@nestjs/common';
import { HealthModule } from './common/health/health.module';

import { SchedulesModule } from './schedules/schedules.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { CoreModule } from './core/core.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    CoreModule,
    HealthModule,
    PrismaModule,
    SchedulesModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
