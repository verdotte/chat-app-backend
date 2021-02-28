import Service from '../database/services';
import Response from '../helpers/response';
import { HTTP_SERVER_ERROR } from '../constants/httpStatusCodes';

const checkUsername = async (res, username) => {
  try {
    const userFound = await Service.User.findUserByUsername([
      username,
    ]);
    if (userFound) {
      return true;
    }
  } catch (error) {
    return Response.error(res, HTTP_SERVER_ERROR, error);
  }

  return false;
};

export default checkUsername;
