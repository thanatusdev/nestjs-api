import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesService } from './schedules.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

describe('SchedulesService', () => {
  let service: SchedulesService;

  const mockSchedulesService = {
    findAll: jest.fn(() => []),
    findOne: jest.fn(() => ({})),
    create: jest.fn(() => ({})),
    update: jest.fn(() => ({})),
    remove: jest.fn(() => ({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        {
          provide: SchedulesService,
          useValue: mockSchedulesService,
        },
      ],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create => should create a new schedule', async () => {
    const createScheduleDto = {
      accountId: 1,
      agentId: 1,
      startTime: '2021-01-01T00:00:00Z',
      endTime: '2021-01-01T01:00:00Z',
    } as CreateScheduleDto;

    const schedule = {
      id: uuidv4(),
      accountId: createScheduleDto.accountId,
      agentId: createScheduleDto.agentId,
      startTime: new Date(createScheduleDto.startTime),
      endTime: new Date(createScheduleDto.endTime),
    } as Schedule;

    jest.spyOn(mockSchedulesService, 'create').mockReturnValue(schedule);

    const result = await service.create(createScheduleDto);

    expect(mockSchedulesService.create).toHaveBeenCalledWith(createScheduleDto);
    expect(result).toEqual(schedule);
  });

  it('findAll => should return an array of schedules', async () => {
    const schedule = {
      id: uuidv4(),
      accountId: 1,
      agentId: 1,
      startTime: new Date('2021-01-01T00:00:00Z'),
      endTime: new Date('2021-01-01T01:00:00Z'),
    } as Schedule;

    jest.spyOn(mockSchedulesService, 'findAll').mockReturnValue([schedule]);

    const result = await service.findAll();

    expect(mockSchedulesService.findAll).toHaveBeenCalled();
    expect(result).toEqual([schedule]);
  });

  it('findOne => should return a schedule by id', async () => {
    const schedule = {
      id: uuidv4(),
      accountId: 1,
      agentId: 1,
      startTime: new Date('2021-01-01T00:00:00Z'),
      endTime: new Date('2021-01-01T01:00:00Z'),
    } as Schedule;

    jest.spyOn(mockSchedulesService, 'findOne').mockReturnValue(schedule);

    const result = await service.findOne(schedule.id);

    expect(mockSchedulesService.findOne).toHaveBeenCalledWith(schedule.id);
    expect(result).toEqual(schedule);
  });

  it('update => should update a schedule by id', async () => {
    const updateScheduleDto = {
      id: uuidv4(),
      accountId: 1,
      agentId: 1,
      startTime: '2021-01-01T00:00:00Z',
      endTime: '2021-01-01T01:00:00Z',
    } as UpdateScheduleDto;

    const schedule = {
      id: updateScheduleDto.id,
      accountId: updateScheduleDto.accountId,
      agentId: updateScheduleDto.agentId,
      startTime: new Date(updateScheduleDto.startTime),
      endTime: new Date(updateScheduleDto.endTime),
    } as Schedule;

    jest.spyOn(mockSchedulesService, 'update').mockReturnValue(schedule);

    const result = await service.update(
      updateScheduleDto.id,
      updateScheduleDto,
    );

    expect(mockSchedulesService.update).toHaveBeenCalledWith(
      schedule.id,
      updateScheduleDto,
    );
    expect(result).toEqual(schedule);
  });

  it('remove => should remove a schedule by id', async () => {
    const schedule = {
      id: uuidv4(),
      accountId: 1,
      agentId: 1,
      startTime: new Date('2021-01-01T00:00:00Z'),
      endTime: new Date('2021-01-01T01:00:00Z'),
    } as Schedule;

    jest.spyOn(mockSchedulesService, 'remove').mockReturnValue(schedule);

    await service.remove(schedule.id);

    expect(mockSchedulesService.remove).toHaveBeenCalledWith(schedule.id);
  });
});
