class ChatService {
  constructor(dbQuery) {
    this.dbQuery = dbQuery;
  }

  /**
   * SaveChat
   * @author Verdotte Aututu
   *
   * @param {Object} chatData
   * @returns {*} userData ! null
   * @memberof ChatService
   */
  async saveChat(chatData) {
    const createUserQuery = `INSERT INTO chats(message, sender_id, receiver_id) VALUES($1, $2, $3)
      returning *`;
    const { rows } = await this.dbQuery.query(
      createUserQuery,
      chatData,
    );
    const res = rows[0];

    return res;
  }

  /**
   * FindAllChat
   * @author Verdotte Aututu
   *
   * @param {Object} user
   * @returns {*} chatData
   * @memberof ChatService
   */
  async findAllChat(user) {
    const signinUserQuery =
      'SELECT * FROM chats WHERE sender_id = $1 AND receiver_id = $2';
    const { rows } = await this.dbQuery.query(signinUserQuery, user);
    return rows;
  }
}

export default ChatService;
