/* eslint-disable prefer-destructuring */

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
      body = await getPostData(req);
    }

    return route.handler(req, res, param, body);
  }

  return 'Error';
};

export default router;
