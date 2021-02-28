import ChatController from './chatController';
import UserController from './userController';

const User = new UserController();
const Chat = new ChatController();

const Controller = {
  User,
  Chat,
};

export default Controller;
