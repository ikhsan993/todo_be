import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import activityRoutes from "./routes/activities.js";
import todoRoutes from "./routes/todos.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/activity-groups", activityRoutes);
app.use("/todo-items", todoRoutes);

const PORT = process.env.MYSQL_PORT || 3030;

app.listen(PORT, () =>
	console.log(`Server running on port : ${PORT} `)
)