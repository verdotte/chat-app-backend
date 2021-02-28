/* eslint-disable class-methods-use-this */

const addHeaders = res => {
  return res.setHeader('Content-Type', 'application/json');
};

class Response {
  static success(res, statusCode, message, data = null) {
    addHeaders(res);

    res.statusCode = statusCode;

    res.end(
      JSON.stringify(
        {
          status: statusCode,
          message,
          data,
        },
        null,
        3,
      ),
    );
  }

  static error(res, statusCode, message) {
    addHeaders(res);

    res.statusCode = statusCode;

    res.end(
      JSON.stringify(
        {
          status: statusCode,
          message,
        },
        null,
        3,
      ),
    );
  }
}

export default Response;
