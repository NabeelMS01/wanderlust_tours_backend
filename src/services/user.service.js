const User = require("../models/user/user.model");

exports.fetchUsers = async () => {
  try {
    const users = await User.find().select("-password"); 

    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};
