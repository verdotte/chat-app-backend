import Controller from '../controllers';

const { User, Chat } = Controller;

const routes = [
  {
    method: 'POST',
    path: '/signup',
    handler: User.signUp,
  },
  {
    method: 'POST',
    path: '/login',
    handler: User.login,
  },
  {
    method: 'GET',
    path: '/profile',
    handler: User.profile,
  },
  {
    method: 'GET',
    path: '/users',
    handler: User.getAllUser,
  },
  {
    method: 'POST',
    path: '/chat',
    handler: Chat.send,
  },
  {
    method: 'GET',
    path: /\/chat\/([0-9a-z]+)/,
    handler: Chat.getAllChat,
  },
];

export default routes;
