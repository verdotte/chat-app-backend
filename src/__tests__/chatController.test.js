/* eslint-disable jest/no-test-callback */
import request from 'supertest';
import app from '../app';
import { userData } from '../__mocks__/dummyData';
import Service from '../database/services';
import Utils from '../helpers/utils';

import {
  HTTP_UNAUTHORIZED,
  HTTP_OK,
} from '../constants/httpStatusCodes';

const { User } = Service;
const { username, password } = userData;

let token;

describe('User Chat Test', () => {
  beforeAll(async () => {
    const newUser = await User.createUser([username, password]);
    token = Utils.generateToken(newUser);
  });

  test('should all chat with a specific user', async done => {
    const res = await request(app)
      .get(`/chat/${1}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.body.status).toBe(HTTP_OK);
    expect(res.body.message).toBe('success');
    done();
  });

  test(`should fail to return chat with a specific user`, async done => {
    const res = await request(app)
      .get(`/chat/${1}`)
      .set('Authorization', `Bearer ${token}~fk-token`);
    expect(res.body.status).toBe(HTTP_UNAUTHORIZED);
    expect(res.body.message).toBe('Unauthorized access');
    done();
  });

  afterAll(async () => {
    await User.truncateTable('users');
  });
});
