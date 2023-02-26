const Form = require("../models/form");
const axios = require("axios");

async function estimateValue(req, res) {
  try {
    const form = await Form.findById(req.body.id);
    console.log(form);
    const data = [
      {
        age: form.age,
        bmi: form.bmi,
        children: form.children,
        smoker: form.smoker,
        illness: form.illness,
      },
    ];
    let store = await axios.get("http://127.0.0.1:5000/api/predict", data);
    console.log(store)
    console.log(data);
    res.status(201).send(store.data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}
async function getEstimateValueId(req, res) {
  try {
    const form = await Form.findById(req.body.id);

    console.log(form.data);
    res.status(201).send(form);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

module.exports = { estimateValue, getEstimateValueId };
