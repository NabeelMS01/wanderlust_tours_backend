const User = require('../../models/user/user.model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//  user signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
 
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email already exists' });

 
    const hashedPassword = await bcrypt.hash(password, 10);

 
    const user = await User.create({ name, email, password: hashedPassword });

 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.log(error,'======errir');
    
    res.status(500).json({ message: 'Something went wrong', error });
  }
};



// user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

     
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.log(error, '=== login error');
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
