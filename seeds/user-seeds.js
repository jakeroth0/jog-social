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
    ];

    const seedUsers = () => User.bulkCreate(userData);

    module.exports = seedUsers;