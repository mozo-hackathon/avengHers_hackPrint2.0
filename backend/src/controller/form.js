const Form = require("../models/form");
const User = require("../models/user");
async function submitForm(req, res) {
  try {
    const form = new Form(req.body);
    const createformEvent = await form.save();

    //pushing the form id in the user model
    let user = await User.findById(req.body.userId);
    if (!user) {
      // the user does not exist
      res.status(400).send("error while finding user");
    }
    let obj = { formId: createformEvent._id };
    user.form.push(obj);
    await user.save(); //saving it to the database

    //sending the form created

    res.status(201).send(createformEvent);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
}

async function getallForms(req, res) {
  try {
    const user = await User.findById(req.body.id);
    if (!user) {
      // the user does not exist
      return {
        status: false,
        data: null,
        error: {
          code: 404,
          message: "User Does not exist",
        },
      };
    }
    const formIds = user.form;
    const forms = [];
    for (i in formIds) {
      const form = await Form.findById(formIds[i].formId);
      forms.push(form);
    }
    res.status(201).send(forms);
  } catch (err) {
    console.log("[auth: getAllForms] Error:", err);
    res.status(400).send(err);
  }
}

async function getFormById(req, res) {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      // the form does not exist
      res.status(400).send("form does not exist");
    }
    res.status(201).send(form);
  } catch (err) {
    console.log("[auth: getFormById] Error:", err);
    res.status(400).send(err);
  }
}

module.exports = { submitForm, getallForms, getFormById };
