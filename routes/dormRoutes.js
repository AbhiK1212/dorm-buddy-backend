import express from "express"
import { createDorm, getDormStatus, updateDescription, deleteDorm } from "../controllers/dormControllers.js"
import { verifyUser } from "../middlewares/verifyUser.js"

const router = express.Router()

router.post("/create", verifyUser, createDorm)
router.get("/status", verifyUser, getDormStatus)
router.put("/updatedescription", verifyUser, updateDescription)
router.delete("/delete", verifyUser, deleteDorm)


export default router