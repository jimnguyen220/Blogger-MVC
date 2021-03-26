// const sequelize = require('../config/connection');
// const { User } = require('../models');

// const userData = require('./userData.json');

// const seedDatabase = async () => {
//     //repopulates the data
//     await sequelize.sync({force: true});
    
//     //creates the users using User model with the information from userData.json
//     await User.bulkCreate(userData, {
//         //uses the hook in the User model to hash password
//         individualHooks: true,
//         return: true,
//     });

//     process.exit(0);
// };

// //calls seedDatabase function
// seedDatabase();