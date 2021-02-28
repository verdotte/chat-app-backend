/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import { HTTP_UNAUTHORIZED } from '../constants/httpStatusCodes';
import Response from '../helpers/response';
import Service from '../database/services';

const { JWT_SECRET_KEY } = process.env;

const checkUser = async (req, res) => {
  let username;
  const { authorization = '' } = req.headers;
  const token = authorization.split(' ')[1];

  if (!token) {
    return Response.error(
      res,
      HTTP_UNAUTHORIZED,
      'Unauthorized access',
    );
  }

  jwt.verify(token, JWT_SECRET_KEY, async (err, decoded) => {
    if (err || !decoded) {
      return Response.error(
        res,
        HTTP_UNAUTHORIZED,
        'Unauthorized access',
      );
    }

    username = decoded.username;
  });

  const currentUser = await Service.User.findUserByUsername([
    username,
  ]);

  if (!currentUser) {
    return Response.error(
      res,
      HTTP_UNAUTHORIZED,
      'Unauthorized access for user',
    );
  }

  return currentUser;
};

export default checkUser;
