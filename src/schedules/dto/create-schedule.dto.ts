import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiProperty({
    description: 'The account id of the schedule',
    type: 'number',
  })
  readonly accountId: number;
  @ApiProperty({
    description: 'The agent id of the schedule',
    type: 'number',
  })
  readonly agentId: number;
  @ApiProperty({
    description: 'The start time of the schedule',
    type: 'string',
    default: '2021-01-01T00:00:00Z',
  })
  readonly startTime: string;
  @ApiProperty({
    description: 'The end time of the schedule',
    type: 'string',
    default: '2021-01-01T01:00:00Z',
  })
  readonly endTime: string;
}
