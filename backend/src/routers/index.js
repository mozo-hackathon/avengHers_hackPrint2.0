const Router = require("express").Router();
const { estimateValue,getEstimateValueId } = require("../controller/estimateVal");
const auth = require("../routers/auth");
const form = require("../routers/form");
Router.use("/auth", auth);
Router.use("/form", form);
Router.post("/estimate", estimateValue);
Router.get("/getestimateid", getEstimateValueId);
Router.get("", (req, res) => {
  res.send("Welcome");
});

module.exports = Router;
