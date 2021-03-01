/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import Response from '../helpers/response';
import {
  HTTP_OK,
  HTTP_SERVER_ERROR,
} from '../constants/httpStatusCodes';
import checkUser from '../middlewares/checkUser';
import Service from '../database/services';
import io from '../helpers/socket';
import notifier from '../helpers/notifier';

const { Chat } = Service;

/**
 *
 * @class UserController
 */
class ChatController {
  /**
   * Send
   * @author Verdotte Aututu
   *
   * @param {*} req
   * @param {*} res
   * @param {*} param
   * @param {*} body
   * @returns {object} res
   * @memberof ChatController
   */
  async send(req, res, param, body) {
    body = JSON.parse(body);
    const { message, receiverId } = body;

    try {
      const { id, username } = await checkUser(req, res);
      const chat = await Chat.saveChat([message, id, receiverId]);
      notifier(username, chat, io.get());
      return Response.success(res, HTTP_OK, 'success', chat);
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
   * @memberof ChatController
   */
  async getAllChat(req, res, param) {
    const receiverId = param;
    try {
      const { id } = await checkUser(req, res);
      const chats = await Chat.findAllChat([id, receiverId]);
      return Response.success(res, HTTP_OK, 'success', chats);
    } catch (error) {
      return Response.error(res, HTTP_SERVER_ERROR, error);
    }
  }
}

export default ChatController;
