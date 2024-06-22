require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const cors = require("cors");
const productTypeRouter = require("./routes/productType");
const salesRouter = require("./routes/sales");
app.use(bodyParser.json());
app.use(errorHandler);
app.use(cors());

db.sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

app.use("/api", salesRouter);
app.use("/api", productTypeRouter);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.status === 400) {
    res.status(400).json({ error: err.message });
  } else if (err.status === 500) {
    res.status(500).json({ error: "Internal Server Error", msg: err.message });
  } else next(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
