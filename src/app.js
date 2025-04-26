const express = require('express');

const mainRouter = require('./routes');
// const userRoutes = require('./routes/user/user.routes');
// const authRoutes = require('./routes/auth/auth.routes');
const logger = require('./middlewares/logger.middleware'); 
const  mongoose = require('mongoose') 
// const authRoutes = require('./routes/auth')
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/wanderlustTours')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use(express.json());
app.use(logger);

// router.use('/users', userRoutes);
// router.use('/auth', authRoutes); 
app.use('/api', mainRouter);  


module.exports = app;