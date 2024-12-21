import mongoose from "mongoose";
/**
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
/**
 * @type {mongoose.Model}
 */

const User = mongoose.model("User", userSchema);

export default User;
