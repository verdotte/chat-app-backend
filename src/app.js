/* eslint-disable no-console */
import http from 'http';

import routes from './routes/routes';
import router from './routes/router';

const app = http.createServer(async (req, res) => {
  await router(req, res, routes);
});

export default app;
