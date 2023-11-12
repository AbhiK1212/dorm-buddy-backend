import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true},
  username: { type: String, required: true, unique: true},
  siteId: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  salt: { type: String, required: true },
  dormId: { type: String, required: false },
})

const User = mongoose.model("User", userSchema)

export default User