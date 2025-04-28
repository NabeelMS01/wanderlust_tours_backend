const { userService } = require("../../services");

 
exports.getAllUsers = async (req, res) => {
  const users =await userService.fetchUsers();

  console.log(users,'=====users');
  
  res.json(users);
};
