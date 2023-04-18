import express from "express";
import {
	createTodo,deleteTodo,getAllTodos, getTodo, updateTodo
} from "../controllers/todo.js";
const router = express.Router();

router.post("/", createTodo);
router.get("/", getAllTodos);
router.get("/:id", getTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);
export default router;
