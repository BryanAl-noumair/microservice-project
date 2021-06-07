import request from 'supertest';

import { app } from '../../app';

it('Should response with details about the current user', async () => {
  const cookie = await global.getSignUpCookie();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('Should response with 401 if not authenticated', async () => {
  await request(app).get('/api/users/currentuser').send().expect(401);
});
