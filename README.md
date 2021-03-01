[![Coverage Status](https://coveralls.io/repos/github/verdotte/chat-app-backend/badge.svg?branch=develop)](https://coveralls.io/github/verdotte/chat-app-backend?branch=develop)

# Chat App Backend

Chat App Backend is a RESTFUL API that can serve a frontend app with data using various endpoints it offers.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build && npm start
```

### Project Features

```
- User
  - Sign in and Sign up
  - Get user profile
  - Get all users

- Chat
  - Send message
  - Get all chat with a specific user
```

### User Endpoints :

| Method | End point | Public | Action            |
| ------ | --------- | ------ | ----------------- |
| GET    | /users    | False  | Get all users     |
| POST   | /signup   | True   | Create a new user |
| POST   | /sign     | True   | Login the user    |
| GET    | profile/  | False  | Get user info     |

### Property Endpoints :

| Method | End point         | Public | Action                         |
| ------ | ----------------- | ------ | ------------------------------ |
| POST   | chat/             | False  | Send message                   |
| GET    | chat/:receiver_id | False  | Get chats with a specific user |
