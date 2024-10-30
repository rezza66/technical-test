import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.us_email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  };
  
  export const registerUser = async (userData) => {
    const existingUser = await User.findOne({ us_email: userData.us_email });
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const user = new User(userData);
    await user.save();
    return user;
  };
  
  export const loginUser = async ({ us_email, us_password }) => {
    const user = await User.findOne({ us_email });
    if (!user || !(await user.comparePassword(us_password))) {
      throw new Error('Invalid email or password');
    }
    const token = generateToken(user);
    return { token, user };
  };
  
  export default { registerUser, loginUser };