/* eslint-disable prefer-destructuring */

import {
  HTTP_NOT_FOUND,
  HTTP_SERVER_ERROR,
} from '../constants/httpStatusCodes';

/**
 * Extract posted data from request body
 * @param req
 * @returns {Promise<any>}
 */
const getPostData = req => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      });
    } catch (e) {
      reject(e);
    }
  });
};

const router = async (req, res, routes) => {
  const route = routes.find(rt => {
    const methodMatch = rt.method === req.method;
    let pathMatch = false;

    if (typeof rt.path === 'object') {
      pathMatch = req.url.match(rt.path);
    } else {
      pathMatch = rt.path === req.url;
    }

    return pathMatch && methodMatch;
  });

  let param = null;

  if (route && typeof route.path === 'object') {
    param = req.url.match(route.path)[1];
  }

  if (route) {
    let body = null;
    if (req.method === 'POST' || req.method === 'PUT') {
      try {
        body = await getPostData(req);
      } catch (error) {
        Response.error(res, HTTP_SERVER_ERROR, error.message);
      }
    }

    return route.handler(req, res, param, body);
  }

  return Response.error(res, HTTP_NOT_FOUND, 'Endpoint not found');
};

export default router;
