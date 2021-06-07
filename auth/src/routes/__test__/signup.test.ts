import request from 'supertest';
import { app } from '../../app';

it('Should returns a 201 on successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'fake_password'
    })
    .expect(201);
});

it('Should returns a 400 with an invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'invalid email',
      password: 'fake_password'
    })
    .expect(400);
});

it('Should returns a 400 with an invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123'
    })
    .expect(400);
});

it('Should returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com'
    })
    .expect(400);
  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'fake_password'
    })
    .expect(400);
});

it('Should disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'fake_password'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'fake_password'
    })
    .expect(400);
});

it('Should sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'fake_password'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
