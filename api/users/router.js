const express = require("express");
const router = express.Router();

const {
  Login,
  Signup,
  updateProfile,
  userByID,
  getAllUsers,
  deleteUser,
} = require("./controller");

router.post("/login", Login);
router.post("/signup", Signup);
router.get("/getalluser", getAllUsers);
router.get("/getuserby/:id", userByID);
router.delete("/delete-user", deleteUser);
router.put("/update-profile", updateProfile);

module.exports = router;
