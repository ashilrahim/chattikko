import mongoose from "mongoose";
/**
 * @type {mongoose.Schema}
 */
export const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
/**
 * @type {mongoose.Model}
 */

const User = mongoose.model("User", userSchema);

export default User;
