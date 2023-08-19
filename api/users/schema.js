const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Number: {
    type: String,
    required: true,
  },

  ProfilePic: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonduck.com%2Ficons%2F180867%2Fprofile-circle&psig=AOvVaw2GccKqx9ILD51uIMghncPt&ust=1692344631567000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLDEl5iZ44ADFQAAAAAdAAAAABAE",
  },

  Role: {
    type: String,
    required: true,
    default: "user",
  },
  Joining: {
    type: Date,
    default: Date.now,
  },
});

const User = model("User", UserSchema);
module.exports = User;
