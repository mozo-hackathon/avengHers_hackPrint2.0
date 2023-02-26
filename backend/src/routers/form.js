const formRouter = require("express").Router();
const {
  submitForm,
  getallForms,
  getFormById

} = require("../controller/form");
const { checkToken } = require("../middlewares/JWT");

formRouter.post("/",checkToken, submitForm);
formRouter.post("/get", getallForms);
formRouter.get("/:id", getFormById);

module.exports = formRouter;
