const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { get } = require('../lib/app');

const mockUser = {
  first_name: 'Test',
  last_name: 'User',
  email: '123@test.com',
  password: 123456
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('POST /api/v1/users should create a new user', async () => {
    const res = await app().post('/api/v1/users').send(mockUser);
    const { first_name, last_name, email } = mockUser;
    expect(res.body).toContain({ first_name, last_name, email });
  });
  afterAll(() => {
    pool.end();
  });
});
