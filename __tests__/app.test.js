const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { UserService } = require('../lib/services/UserService');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: '123@test.com',
  password: '123456'
};

const signUpAndIn = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...mockUser, ...userProps });

  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  console.log('user', { user });
  return [agent, user];
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
    const res = await request(app).post('/api/v1/users/sessions').send({ email: '123@test.com', password: '123456' });
    expect(res.status).toEqual(200);
  });
  it('/protected should return a 401 if not authenticated', async () => {
    const res = await request(app).get('/api/v1/users/protected');
    expect(res.status).toEqual(401);
  });
  it('/protected should return the current user if authenticated', async () => {
    const [agent] = await signUpAndIn();
    const res = await agent.get('/api/v1/users/protected');
    expect(res.status).toEqual(200);
  });
  it('/secrets should return a 401 error if not admin', async () => {
    const res = await request(app).get('/api/v1/secrets');
    expect(res.status).toEqual(401);
  });
  it('/secrets should return a list of secrets  to signed in users', async () => {
    const [agent] = await signUpAndIn();
    const res = await agent.get('/api/v1/secrets');
    expect(res.status).toEqual(200);
  });
  it('POST /secrets should post a new secret if the user is signed in', async () => {
    const [agent] = await signUpAndIn();
    const res = await agent.post('/api/v1/secrets').send({
      title: 'New',
      descption: 'Secret description'
    });
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'New',
      descption: 'Secret description',
      created_at: expect.any(String)
    });
  });
  afterAll(() => {
    pool.end();
  });
});
