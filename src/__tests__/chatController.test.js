/* eslint-disable jest/no-test-callback */
import request from 'supertest';
import app from '../app';
import { userData, chatData } from '../__mocks__/dummyData';
import Service from '../database/services';

import {
  //   HTTP_UNAUTHORIZED,
  HTTP_OK,
} from '../constants/httpStatusCodes';

const { User } = Service;

let token;

describe('User Chat Test', () => {
  beforeAll(async () => {
    test('should create user', async done => {
      const res = await request(app)
        .post(`/signup`)
        .send(userData);
      token = res.body.data.token;
      expect(res.body.status).toBe(HTTP_OK);
      // expect(res.body.message).toBe('successful login');
      // expect(res.body.data.username).toBe(userData.username);
      done();
    });
  });

  test('should post a new message', async done => {
    const res = await request(app)
      .post(`/chat`)
      .set('Authorization', `Bearer ${token}`)
      .send(chatData);
    expect(res.body.status).toBe(HTTP_OK);
    expect(res.body.message).toBe('success');
    done();
  });

  afterAll(async () => {
    await User.truncateTabl('users');
    await User.truncateTable('chats');
  });
});
