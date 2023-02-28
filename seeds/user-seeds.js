const { User } = require('../models');

const userData = [
      {
        id: 1,
        username: 'JohnDoe',
        user_email: 'johndoe@example.com',
        user_created: new Date(),
        password: 'password123',
      },
      {
        id: 2,
        username: 'JaneDoe',
        user_email: 'janedoe@example.com',
        user_created: new Date(),
        password: 'password456',
      },
      {
        id: 3,
        username: 'Tammy',
        user_email: 'tammy@example.com',
        user_created: new Date(),
        password: 'password789',
      },
      {
        id: 4,
        username: 'Amy',
        user_email: 'amy@gmail.com',
        user_created: new Date(),
        password: 'password123',
      },
      {
        id: 5,
        username: 'Amy',
        user_email: 'amy@gmail.com',
        user_created: new Date(),
        password: '$2b$10$RJT./VUfRjHKBcIELMkekODIk5CHzqJwRojkUVk4vUBZvkah67sCy',
      },
    ];

    const seedUsers = () => User.bulkCreate(userData);

    module.exports = seedUsers;