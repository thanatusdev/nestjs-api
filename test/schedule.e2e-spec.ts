import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateScheduleDto } from 'src/schedules/dto/create-schedule.dto';
import { UpdateScheduleDto } from 'src/schedules/dto/update-schedule.dto';

describe('ScheduleController (e2e)', () => {
  let app: INestApplication;
  let scheduleId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/schedules (POST)', () => {
    const newSchedule: CreateScheduleDto = {
      accountId: 1,
      agentId: 1,
      startTime: '2021-01-01T00:00:00Z',
      endTime: '2021-01-01T01:00:00Z',
    };
    return request(app.getHttpServer())
      .post('/schedules')
      .send(newSchedule)
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data).toBeInstanceOf(Object);
        expect(res.body.data.id).toBeDefined();
        scheduleId = res.body.data.id;
      });
  });

  it('/schedules/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/schedules/${scheduleId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data).toBeInstanceOf(Object);
        expect(res.body.data.id).toBe(scheduleId);
      });
  });

  it('/schedules (GET)', () => {
    return request(app.getHttpServer())
      .get('/schedules')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data).toBeInstanceOf(Array);
      });
  });

  it('/schedules/:id (PATCH)', () => {
    const updatedSchedule: UpdateScheduleDto = {
      accountId: 2,
      agentId: 2,
      startTime: '2021-01-01T00:00:00Z',
      endTime: '2021-01-01T01:00:00Z',
    };
    return request(app.getHttpServer())
      .patch(`/schedules/${scheduleId}`)
      .send(updatedSchedule)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data).toBeInstanceOf(Object);
        expect(res.body.data.id).toBe(scheduleId);
        expect(res.body.data.accountId).toBe(updatedSchedule.accountId);
      });
  });

  it('/schedules/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/schedules/${scheduleId}`)
      .expect(200);
  });
});
