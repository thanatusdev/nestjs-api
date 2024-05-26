import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './entities/task.entity';

describe('TasksController', () => {
  let controller: TasksController;

  const mockTasksService = {
    findAll: jest.fn(() => []),
    findOne: jest.fn(() => ({})),
    create: jest.fn(() => ({})),
    update: jest.fn(() => ({})),
    remove: jest.fn(() => ({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
    } as Task;

    jest.spyOn(mockTasksService, 'create').mockReturnValue(task);

    const result = await controller.create(createTaskDto);

    expect(mockTasksService.create).toHaveBeenCalledWith(createTaskDto);
    expect(result).toEqual(task);
  });

  it('findAll => should return an array of tasks', async () => {
    const task = {
      id: uuidv4(),
      accountId: 1,
      scheduleId: uuidv4(),
      duration: 60,
      startTime: new Date(),
      type: 'work',
    } as Task;

    jest.spyOn(mockTasksService, 'findAll').mockReturnValue([task]);

    const result = await controller.findAll();

    expect(mockTasksService.findAll).toHaveBeenCalled();
    expect(result).toEqual([task]);
  });

  it('findOne => should return a task by id', async () => {
    const task = {
      id: uuidv4(),
      accountId: 1,
      scheduleId: uuidv4(),
      duration: 60,
      startTime: new Date(),
      type: 'work',
    } as Task;

    jest.spyOn(mockTasksService, 'findOne').mockReturnValue(task);

    const result = await controller.findOne(task.id);

    expect(mockTasksService.findOne).toHaveBeenCalledWith(task.id);
    expect(result).toEqual(task);
  });

  it('update => should update a task by id', async () => {
    const task = {
      id: uuidv4(),
      accountId: 1,
      scheduleId: uuidv4(),
      duration: 60,
      startTime: new Date(),
      type: 'work',
    } as Task;

    const updateTaskDto = {
      accountId: 1,
      scheduleId: uuidv4(),
      duration: 60,
      startTime: '2021-01-01T00:00:00Z',
      type: 'work',
    } as CreateTaskDto;

    jest.spyOn(mockTasksService, 'update').mockReturnValue(task);

    const result = await controller.update(task.id, updateTaskDto);

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
      startTime: new Date(),
      type: 'work',
    } as Task;

    jest.spyOn(mockTasksService, 'remove').mockReturnValue(task);

    const result = await controller.remove(task.id);

    expect(mockTasksService.remove).toHaveBeenCalledWith(task.id);
    expect(result).toEqual(task);
  });
});
