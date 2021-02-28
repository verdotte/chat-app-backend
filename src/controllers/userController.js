/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import Utils from '../helpers/utils';
import Response from '../helpers/response';
import {
  HTTP_CREATED,
  HTTP_OK,
  HTTP_UNAUTHORIZED,
  HTTP_EXIST,
  HTTP_SERVER_ERROR,
} from '../constants/httpStatusCodes';
import checkUser from '../middlewares/checkUser';
import Service from '../database/services';
import checkUsername from '../middlewares/checkUsername';

const { User } = Service;

/**
 *
 * @class UserController
 */
class UserController {
  /**
   * Sign Up
   * @author Verdotte Aututu
   *
   * @param {*} req
   * @param {*} res
   * @param {*} param
   * @param {*} body
   * @returns {object} res
   * @memberof UserController
   */
  async signUp(req, res, param, body) {
    body = JSON.parse(body);

    const { username } = body;
    const hashPassword = Utils.hashPassword(body.password);
    const userFound = await checkUsername(res, username);

    if (userFound) {
      return Response.error(res, HTTP_EXIST, 'username already used');
    }

    try {
      const user = await User.createUser([username, hashPassword]);
      const token = Utils.generateToken(user);

      return Response.success(
        res,
        HTTP_CREATED,
        'successful registered',
        { username: user.username, token },
      );
    } catch (error) {
      return Response.error(res, HTTP_SERVER_ERROR, error);
    }
  }

  /**
   * Login
   * @author Verdotte Aututu
   *
   * @param {*} req
   * @param {*} res
   * @returns {object} res
   * @memberof UserController
   */
  async login(req, res, param, body) {
    body = JSON.parse(body);
    const { username, password } = body;

    try {
      const user = await User.findUserByUsername([username]);
      if (!user || !Utils.comparePassword(user.password, password)) {
        return Response.error(
          res,
          HTTP_UNAUTHORIZED,
          'The credentials you provided are incorrect',
        );
      }
      const token = Utils.generateToken(user);

      return Response.success(res, HTTP_OK, 'successful login', {
        username: user.username,
        token,
      });
    } catch (error) {
      return Response.error(res, HTTP_SERVER_ERROR, error);
    }
  }

  /**
   * Get User Profile
   * @author Verdotte Aututu
   *
   * @param {*} req
   * @param {*} res
   * @returns {object} res
   * @memberof UserController
   */
  async profile(req, res) {
    try {
      const { id, username } = await checkUser(req, res);
      return Response.success(res, HTTP_OK, 'success', {
        userId: id,
        username,
      });
    } catch (error) {
      return Response.error(res, HTTP_SERVER_ERROR, error);
    }
  }

  /**
   * Get All User
   * @author Verdotte Aututu
   *
   * @param {*} req
   * @param {*} res
   * @returns {object} res
   * @memberof UserController
   */
  async getAllUser(req, res) {
    try {
      const { id } = await checkUser(req, res);
      const users = await User.findAllUser([id]);
      return Response.success(res, HTTP_OK, 'success', users);
    } catch (error) {
      return Response.error(res, HTTP_SERVER_ERROR, error);
    }
  }
}

export default UserController;
