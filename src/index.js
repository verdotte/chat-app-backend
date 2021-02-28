/* eslint-disable no-console */
import dotenv from 'dotenv';
import socketIO from './helpers/socket';
import app from './app';

dotenv.config();

const { PORT } = process.env;

const port = PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const io = socketIO.init(server);

io.on('connection', socket => {
  console.log('Connection success', socket.id);
  socket.on('disconnect', () => {
    console.log('Connection disconnected', socket.id);
  });
});
