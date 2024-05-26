import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The account id of the task',
    type: 'number',
  })
  accountId: number;
  @ApiProperty({
    description: 'The schedule id of the task',
    type: 'string',
  })
  scheduleId: string;
  @ApiProperty({
    description: 'The start time of the task',
    type: 'string',
    default: '2021-01-01T00:00:00Z',
  })
  startTime: string;
  @ApiProperty({
    description: 'Duration of the task',
    type: 'number',
  })
  duration: number;
  @ApiProperty({
    description: 'Type of the task',
    type: 'string',
    enum: ['break', 'work'],
  })
  type: 'break' | 'work';
}
