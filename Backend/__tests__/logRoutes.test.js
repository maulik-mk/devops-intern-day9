import request from 'supertest';
import { app } from '../src/main.js';
import mongoose from 'mongoose';

describe('Log Routes API', () => {
  it('GET /logs should return 200 with welcome message', async () => {
    const res = await request(app).get('/logs');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello, DevOps Intern Day 3');
  });

  it('GET /logs/all should return logs array or 500 error', async () => {
    const res = await request(app).get('/logs/all');
    expect([200, 500]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(Array.isArray(res.body)).toBe(true);
    }
  });

  it('GET /unknown should return 404', async () => {
    const res = await request(app).get('/logs/unknown');
    expect(res.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
