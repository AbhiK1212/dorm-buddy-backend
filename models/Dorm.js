import mongoose from "mongoose"

const dormSchema = new mongoose.Schema({
  dormName: { type: String, required: true, unique: true},
  dormId: { type: String, required: true, unique: true},
  dormTemperature: { type: Number, required: true },
  dormHumidity: { type: Number, required: true },
  dormMembers: { type: Array, required: true },
  doorLastOpened: { type: Date, required: true },
  doorOpenedTimes: { type: Array, required: true },
  dormStatus: { type: String, required: true },
  dormImage: { type: String, required: true },
  dormDescription: { type: String, required: true },
})

const Dorm = mongoose.model("Dorm", dormSchema)

export default Dorm