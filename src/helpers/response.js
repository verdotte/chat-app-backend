/* eslint-disable class-methods-use-this */

class Response {
  static success(res, statusCode, message, data = null) {
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
