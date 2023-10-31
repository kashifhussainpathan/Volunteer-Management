require("./db/db.connect");

const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config({ path: "./config.env" });
const eventRouter = require("./routes/event.route");
const volunteerRouter = require("./routes/volunteer.route");

const app = express();
const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/event", eventRouter);
app.use("/volunteer", volunteerRouter);

app.use("/", (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
