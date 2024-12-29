import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { deleteMessage, getMessages, getUsersForSideBar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSideBar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage)
router.delete("/delete/:id", protectRoute, deleteMessage)

export default router;
