import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

const kosakataBaru = {
  nihongo: 'ねこ',
  romaji: 'neko',
  arti: 'Kucing',
  category: 'Hewan',
};

describe('Kosakata (e2e): penanganan error', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('404 Not Found: id kosakata tidak ditemukan', async () => {
    const res = await request(app.getHttpServer())
      .get('/kosakata/3f2b8c1e-1111-4111-8111-111111111111')
      .expect(404);

    expect(res.body.error).toBe('Not Found');
  });

  it('409 Conflict: tulisan Jepang yang sama sudah ada', async () => {
    await request(app.getHttpServer())
      .post('/kosakata')
      .send(kosakataBaru)
      .expect(201);

    const res = await request(app.getHttpServer())
      .post('/kosakata')
      .send(kosakataBaru)
      .expect(409);

    expect(res.body.error).toBe('Conflict');
  });

  it('400 Bad Request: data tidak lolos validasi DTO', async () => {
    await request(app.getHttpServer())
      .post('/kosakata')
      .send({ ...kosakataBaru, level: 'N6' })
      .expect(400);
  });

  it('400 Bad Request: format id bukan UUID', async () => {
    await request(app.getHttpServer()).delete('/kosakata/abc').expect(400);
  });
});