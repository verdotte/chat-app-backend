import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET_KEY } = process.env;

/**
 * A Utils class to hash password, compare hashed password & generate token
 */
class Utils {
  /**
   * hashPassword Method
   *
   * @author Verdotte Aututu
   * @static
   * @param {string} password
   * @returns {string} returns hashed password
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
   * comparePassword Method
   *
   * @author Verdotte Aututu
   * @static
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} returns True or False
   */
  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  /**
   * Generate Token Method
   *
   * @author Verdotte Aututu
   * @static
   * @param  {string} user
   * @returns  {string} returns token
   */
  static generateToken(user) {
    const token = jwt.sign({ ...user }, JWT_SECRET_KEY, {
      expiresIn: '2d',
    });
    return token;
  }
}

export default Utils;
