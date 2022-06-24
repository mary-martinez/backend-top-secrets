const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { get } = require('../lib/app');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: '123@test.com',
  password: '123456'
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('POST /api/v1/users should create a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { firstName, lastName, email } = mockUser;
    expect(res.body).toEqual({ id: expect.any(String), firstName, lastName, email });
  });
  it('/api/v1/users/sessions signs in a user', async () => {
    await request(app).post('/api/v1/users').send(mockUser);
    const res = await request(app).post('/api/v1/users/sessions').send({ email: mockUser.email, password: mockUser.password });
    expect(res.status).toEqual(200);
  });
  afterAll(() => {
    pool.end();
  });
});
