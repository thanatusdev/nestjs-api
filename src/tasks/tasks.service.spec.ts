import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuidv4 } from 'uuid';

describe('TasksService', () => {
  let service: TasksService;

  const mockTasksService = {
    findAll: jest.fn(() => []),
    findOne: jest.fn(() => ({})),
    create: jest.fn(() => ({})),
    update: jest.fn(() => ({})),
    remove: jest.fn(() => ({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create => should create a new task', async () => {
    const createTaskDto = {
      accountId: 1,
      scheduleId: uuidv4(),
      duration: 60,
      startTime: '2021-01-01T00:00:00Z',
      type: 'work',
    } as CreateTaskDto;

    const task = {
      id: uuidv4(),
      accountId: createTaskDto.accountId,
      scheduleId: createTaskDto.scheduleId,
      duration: createTaskDto.duration,
      startTime: new Date(createTaskDto.startTime),
      type: createTaskDto.type,
    };

    jest.spyOn(mockTasksService, 'create').mockReturnValue(task);

    const result = await service.create(createTaskDto);

    expect(mockTasksService.create).toHaveBeenCalledWith(createTaskDto);
    expect(result).toEqual(task);
  });

  it('findAll => should return an array of tasks', async () => {
    const tasks = [
      {
        id: uuidv4(),
        accountId: 1,
        scheduleId: uuidv4(),
        duration: 60,
        startTime: new Date('2021-01-01T00:00:00Z'),
        type: 'work',
      },
      {
        id: uuidv4(),
        accountId: 1,
        scheduleId: uuidv4(),
        duration: 60,
        startTime: new Date('2021-01-01T00:00:00Z'),
        type: 'work',
      },
    ];

    jest.spyOn(mockTasksService, 'findAll').mockReturnValue(tasks);

    const result = await service.findAll();

    expect(mockTasksService.findAll).toHaveBeenCalled();
    expect(result).toEqual(tasks);
  });

  it('findOne => should return a task by id', async () => {
    const task = {
      id: uuidv4(),
      accountId: 1,
      scheduleId: uuidv4(),
      duration: 60,
      startTime: new Date('2021-01-01T00:00:00Z'),
      type: 'work',
    };

    jest.spyOn(mockTasksService, 'findOne').mockReturnValue(task);

    const result = await service.findOne(task.id);

    expect(mockTasksService.findOne).toHaveBeenCalledWith(task.id);
    expect(result).toEqual(task);
  });

  it('update => should update a task by id', async () => {
    const updateTaskDto = {
      accountId: 1,
      scheduleId: uuidv4(),
      duration: 60,
      startTime: '2021-01-01T00:00:00Z',
      type: 'work',
    } as CreateTaskDto;

    const task = {
      id: uuidv4(),
      accountId: updateTaskDto.accountId,
      scheduleId: updateTaskDto.scheduleId,
      duration: updateTaskDto.duration,
      startTime: new Date(updateTaskDto.startTime),
      type: updateTaskDto.type,
    };

    jest.spyOn(mockTasksService, 'update').mockReturnValue(task);

    const result = await service.update(task.id, updateTaskDto);

    expect(mockTasksService.update).toHaveBeenCalledWith(
      task.id,
      updateTaskDto,
    );
    expect(result).toEqual(task);
  });

  it('remove => should remove a task by id', async () => {
    const task = {
      id: uuidv4(),
      accountId: 1,
      scheduleId: uuidv4(),
      duration: 60,
      startTime: new Date('2021-01-01T00:00:00Z'),
      type: 'work',
    };

    jest.spyOn(mockTasksService, 'remove').mockReturnValue(task);

    const result = await service.remove(task.id);

    expect(mockTasksService.remove).toHaveBeenCalledWith(task.id);
    expect(result).toEqual(task);
  });
});
