import express from "express";
import {
	creatActivity,getAllActivity,getActivity,updateActivity,deleteActivity
} from "../controllers/activity.js";

const router = express.Router();

router.post("/", creatActivity);
router.get("/", getAllActivity);
router.get("/:id", getActivity);
router.patch("/:id", updateActivity);
router.delete("/:id", deleteActivity);
export default router;
