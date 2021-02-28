class UserService {
  constructor(dbQuery) {
    this.dbQuery = dbQuery;
  }

  /**
   * Create user
   * @param {Object} userData
   * @returns {*} userData ! null
   */
  async createUser(userData) {
    const createUserQuery = `INSERT INTO users(username, password) VALUES($1, $2)
    returning *`;
    const { rows } = await this.dbQuery.query(
      createUserQuery,
      userData,
    );
    const res = rows[0];

    return res;
  }

  /**
   * FindUserByUsername
   * @param {Object} username
   * @returns {*} userData
   */
  async findUserByUsername(username) {
    const signinUserQuery = 'SELECT * FROM users WHERE username = $1';
    const { rows } = await this.dbQuery.query(
      signinUserQuery,
      username,
    );
    const res = rows[0];

    return res;
  }

  /**
   * FindUserByPass
   * @param {Object} username
   * @returns {*} userData
   */
  async findAllUser(userId) {
    const findAllUserQuery =
      'SELECT id, username FROM users WHERE id != $1';
    const { rows } = await this.dbQuery.query(
      findAllUserQuery,
      userId,
    );
    return rows;
  }

  /**
   * Truncate Table
   * @param {Object} tableName
   * @returns {*} userData
   */
  async truncateTable(tableName) {
    const truncateTableQuery = `TRUNCATE TABLE ${tableName}`;
    const { rows } = await this.dbQuery.query(truncateTableQuery);
    return rows;
  }
}

export default UserService;
