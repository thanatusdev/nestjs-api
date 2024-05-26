import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { CreateScheduleDto } from 'src/schedules/dto/create-schedule.dto';

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let taskId: string;
  let scheduleId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async (done) => {
    await app.close();
    done();
  });

  it('Create a schedule to use its id or get the first one', () => {
    const newSchedule: CreateScheduleDto = {
      accountId: 1,
      agentId: 1,
      startTime: '2021-01-01T00:00:00Z',
      endTime: '2021-01-01T01:00:00Z',
    };
    return request(app.getHttpServer())
      .get('/schedules')
      .expect(200)
      .expect((res) => {
        if (res.body.data.length === 0) {
          request(app.getHttpServer())
            .post('/schedules')
            .send(newSchedule)
            .expect(201)
            .expect((res) => {
              expect(res.body).toBeInstanceOf(Object);
              expect(res.body.data).toBeInstanceOf(Object);
              expect(res.body.data.id).toBeDefined();
              scheduleId = res.body.data.id;
            });
        } else {
          scheduleId = res.body.data[0].id;
        }
      });
  });

  it('/tasks (POST)', () => {
    const newTask: CreateTaskDto = {
      scheduleId: scheduleId,
      accountId: 1,
      duration: 60,
      startTime: '2021-01-01T00:00:00Z',
      type: 'work',
    };
    return request(app.getHttpServer())
      .post('/tasks')
      .send(newTask)
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data).toBeInstanceOf(Object);
        expect(res.body.data.id).toBeDefined();
        taskId = res.body.data.id;
      });
  });

  it('/tasks/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data).toBeInstanceOf(Object);
        expect(res.body.data.id).toBe(taskId);
      });
  });

  it('/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data).toBeInstanceOf(Array);
      });
  });

  it('/tasks/:id (PATCH)', () => {
    const updatedTask: UpdateTaskDto = {
      scheduleId: scheduleId,
      accountId: 2,
      startTime: '2021-01-01T00:00:00Z',
      duration: 120,
      type: 'break',
    };
    return request(app.getHttpServer())
      .patch(`/tasks/${taskId}`)
      .send(updatedTask)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data).toBeInstanceOf(Object);
        expect(res.body.data.id).toBe(taskId);
        expect(res.body.data.accountId).toBe(updatedTask.accountId);
      });
  });

  it('/tasks/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete(`/tasks/${taskId}`).expect(200);
  });
});
