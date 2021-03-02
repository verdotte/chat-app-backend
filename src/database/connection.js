/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import pool from './config';

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create User Table
 */
const createUserTable = () => {
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
    (id SERIAL PRIMARY KEY, 
    username VARCHAR(100) UNIQUE NOT NULL,  
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT now())`;

  pool
    .query(userCreateQuery)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Chat Table
 */
const createChatTable = () => {
  const chatCreateQuery = `CREATE TABLE IF NOT EXISTS chats
      (id SERIAL PRIMARY KEY,
      message VARCHAR(100) NOT NULL,
      sender_id SERIAL NOT NULL,
      receiver_id SERIAL NOT NULL,
      created_at TIMESTAMP DEFAULT now())`;

  pool
    .query(chatCreateQuery)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const usersDropQuery = 'DROP TABLE IF EXISTS users';
  pool
    .query(usersDropQuery)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Chat Table
 */
const dropChatTable = () => {
  const chatDropQuery = 'DROP TABLE IF EXISTS chats';
  pool
    .query(chatDropQuery)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createChatTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropChatTable();
};

pool.end(() => {
  console.log('client removed');
  process.exit(0);
});

export { createAllTables, dropAllTables };

require('make-runnable');
