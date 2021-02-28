import dbQuery from '../query';
import UserService from './userService';
import ChatService from './chatService';

const User = new UserService(dbQuery);
const Chat = new ChatService(dbQuery);

const Service = { User, Chat };

export default Service;
