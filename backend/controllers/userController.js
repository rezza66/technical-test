import User from '../models/User.js';

// export const createUser = async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// export const updateUser = async (req, res) => {
//   try {
//     const user = await User.findOneAndUpdate({ us_id: req.params.id }, req.body, { new: true });
//     if (!user) return res.status(404).json('User not found');
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ us_id: req.params.id });
    if (!user) return res.status(404).json('User not found');
    res.status(200).json('User deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};
