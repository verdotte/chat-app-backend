/* eslint-disable jest/no-test-callback */
import request from 'supertest';
import app from '../app';
import { userData } from '../__mocks__/dummyData';

import {
  HTTP_CREATED,
  HTTP_UNAUTHORIZED,
  HTTP_EXIST,
  HTTP_OK,
} from '../constants/httpStatusCodes';
import Service from '../database/services';

let token;

describe('User Authentication Test', () => {
  test('should create a `new user`', async done => {
    const res = await request(app)
      .post(`/signup`)
      .send(userData);
    expect(res.body.status).toBe(HTTP_CREATED);
    expect(res.body.message).toBe('successful registered');
    token = res.body.data.token;
    done();
  });

  test(`should fail to create a user with same username`, async done => {
    const res = await request(app)
      .post(`/signup`)
      .send(userData);
    expect(res.body.status).toBe(HTTP_EXIST);
    expect(res.body.message).toBe('username already used');
    done();
  });

  test('should login the user', async done => {
    const res = await request(app)
      .post(`/login`)
      .send(userData);
    expect(res.body.status).toBe(HTTP_OK);
    expect(res.body.message).toBe('successful login');
    expect(res.body.data.username).toBe(userData.username);
    done();
  });

  test(`should fail to login a user with wrong username`, async done => {
    const res = await request(app)
      .post(`/login`)
      .send({ username: 'fk-username', password: userData.password });
    expect(res.body.status).toBe(HTTP_UNAUTHORIZED);
    expect(res.body.message).toBe(
      'The credentials you provided are incorrect',
    );
    done();
  });

  test(`should fail to login a user with wrong password`, async done => {
    userData.password = 'fk-password';
    const res = await request(app)
      .post(`/login`)
      .send(userData);
    expect(res.body.status).toBe(HTTP_UNAUTHORIZED);
    expect(res.body.message).toBe(
      'The credentials you provided are incorrect',
    );
    done();
  });

  test(`should return user profile`, async done => {
    const res = await request(app)
      .get(`/profile`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.body.status).toBe(HTTP_OK);
    expect(res.body.message).toBe('success');
    expect(res.body.data.username).toBe(userData.username);
    done();
  });

  test(`should return user all users`, async done => {
    const res = await request(app)
      .get(`/users`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.body.status).toBe(HTTP_OK);
    expect(res.body.message).toBe('success');
    done();
  });

  test(`should fail to return user profile`, async done => {
    const res = await request(app)
      .get(`/profile`)
      .set('Authorization', `Bearer ${token}~fk-token`);
    expect(res.body.status).toBe(HTTP_UNAUTHORIZED);
    expect(res.body.message).toBe('Unauthorized access');
    done();
  });

  afterAll(async () => {
    await Service.User.truncateTabl('users');
  });
});
