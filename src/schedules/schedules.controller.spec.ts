import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { v4 as uuidv4 } from 'uuid';
import { Schedule } from './entities/schedule.entity';

describe('SchedulesController', () => {
  let controller: SchedulesController;

  const mockSchedulesService = {
    findAll: jest.fn(() => []),
    findOne: jest.fn(() => ({})),
    create: jest.fn(() => ({})),
    update: jest.fn(() => ({})),
    remove: jest.fn(() => ({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [
        {
          provide: SchedulesService,
          useValue: mockSchedulesService,
        },
      ],
    }).compile();

    controller = module.get<SchedulesController>(SchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

    const result = await controller.create(createScheduleDto);

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

    const result = await controller.findAll();

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

    const result = await controller.findOne(schedule.id);

    expect(mockSchedulesService.findOne).toHaveBeenCalledWith(schedule.id);
    expect(result).toEqual(schedule);
  });

  it('update => should update a schedule by id', async () => {
    const updateScheduleDto = {
      accountId: 1,
      agentId: 1,
      startTime: '2021-01-01T00:00:00Z',
      endTime: '2021-01-01T01:00:00Z',
    } as CreateScheduleDto;

    const schedule = {
      id: uuidv4(),
      accountId: updateScheduleDto.accountId,
      agentId: updateScheduleDto.agentId,
      startTime: new Date(updateScheduleDto.startTime),
      endTime: new Date(updateScheduleDto.endTime),
    } as Schedule;

    jest.spyOn(mockSchedulesService, 'update').mockReturnValue(schedule);

    const result = await controller.update(schedule.id, updateScheduleDto);

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

    await controller.remove(schedule.id);

    expect(mockSchedulesService.remove).toHaveBeenCalledWith(schedule.id);
  });
});
