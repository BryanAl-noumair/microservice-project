import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';

it('Should return a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.getSignUpCookie())
    .send({
      title: 'fake_title',
      price: 20
    })
    .expect(404);
});

it('Should return a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'fake_title',
      price: 20
    })
    .expect(401);
});

it('Should return a 401 if the user does not own the ticket', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', global.getSignUpCookie())
    .send({
      title: 'fake_title',
      price: 20
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.getSignUpCookie())
    .send({
      title: 'fake_title_update',
      price: 23
    })
    .expect(401);
});

it('Should return a 400 if the user provides an invalid title or price', async () => {
  const cookie = global.getSignUpCookie();

  const response = await request(app).post(`/api/tickets`).set('Cookie', cookie).send({
    title: 'fake_title',
    price: 20
  });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'fake_title_update',
      price: -20
    })
    .expect(400);
});

it('Should updates the ticket if provided valid inputs', async () => {
  const cookie = global.getSignUpCookie();

  const response = await request(app).post(`/api/tickets`).set('Cookie', cookie).send({
    title: 'fake_title',
    price: 20
  });

  const title = 'fake_title_update';
  const price = 27;

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title,
      price
    })
    .expect(200);

  const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send();

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
