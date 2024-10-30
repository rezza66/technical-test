import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res, next) => {
  const { us_name, us_email, us_password, us_phone_number, us_address } = req.body;

  try {
    const userExists = await User.findOne({ us_email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      us_name,
      us_email,
      us_password,
      us_phone_number,
      us_address,
    });

    res.status(201).json({
      us_id: user.us_id,
      us_name: user.us_name,
      us_email: user.us_email,
      us_phone_number: user.us_phone_number,
      us_address: user.us_address,
      token: generateToken(user.us_id),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};



export const login = async (req, res, next) => {
  const { us_email, us_password } = req.body;
  try {
    const user = await User.findOne({ us_email });

    if (user && (await user.comparePassword(us_password))) {
      res.json({
        us_id: user.us_id,
        us_name: user.us_name,
        us_email: user.us_email,
        us_phone_number: user.us_phone_number,
        us_address: user.us_address,
        token: generateToken(user.us_id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};
