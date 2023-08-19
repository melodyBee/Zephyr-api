const User = require("./schema");
require("dotenv").config();
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const Login = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    res.status(403).json({
      message: "Missing Required Field",
    });
  } else {
    try {
      const CheckUser = await User.findOne({ Email });

      if (!CheckUser) {
        res.status(404).json({
          message: "User Doesn't Exist",
        });
      } else {
        const decryptPassword = await compare(Password, CheckUser.Password);

        if (Email == CheckUser.Email && decryptPassword) {
          const UserData = {
            Email: CheckUser.Email,
            _id: CheckUser._id,
            Role: CheckUser.Role,
            Number: CheckUser.Number,
            ProfilePic: CheckUser.ProfilePic,
            Joining: CheckUser.Joining,
          };

          const token = sign(UserData, process.env.JWT_SECRET);

          res.json({
            message: "Successfully Logged In",
            token,
          });
        } else {
          res.status(403).json({
            message: "Invalid Credentials",
          });
        }
      }
    } catch (error) {
      res.json({
        message: error.message,
      });
    }
  }
};

const Signup = async (req, res) => {
  const { Name, Email, Password, Number } = req.body;

  if (!Name || !Email || !Password || !Number) {
    res.status(403).json({
      message: "Missing Required Field",
    });
  } else {
    try {
      const CheckUser = await User.findOne({ Email });

      if (CheckUser) {
        res.json({
          message: "User Already Exists",
        });
      } else {
        await User.create({
          Name,
          Email,
          Number,
          Password: await hash(Password, 12),
        });
        res.json({
          message: "Successfully Created",
        });
      }
    } catch (error) {
      res.json({
        message: error.message,
      });
    }
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json({ users });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  const { _id, Email, Name, ProfilePic } = req.body;

  const filter = { _id };
  const update = { Email, Name, ProfilePic };

  try {
    const updated = await User.findOneAndUpdate(filter, update, {
      new: true,
    });

    res.json({
      message: "Successfully Updated",
      user: updated,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const userByID = async (req, res) => {
  const { _id } = req.query;

  try {
    const user = await User.findOne({ _id });

    res.json({ user });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.body;

  try {
    await User.deleteOne({ _id });

    res.json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports = {
  Login,
  Signup,
  deleteUser,
  updateProfile,
  userByID,
  getAllUsers,
};
