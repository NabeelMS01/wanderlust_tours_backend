const userService = require('../../services/user.service');

exports.getAllUsers = async (req, res) => {
  const users =await userService.fetchUsers();

  console.log(users,'=====users');
  
  res.json(users);
};
