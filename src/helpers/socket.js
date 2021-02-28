import socket from 'socket.io';

let io;

const socketIO = {
  init: server => {
    io = socket(server, {
      log: false,
      origins: '*:*',
    });
    return io;
  },
  get: () => {
    if (!io) {
      throw new Error('socket is not initialized');
    }
    return io;
  },
};

export default socketIO;
