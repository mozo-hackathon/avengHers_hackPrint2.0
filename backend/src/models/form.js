const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type:String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  policyNumber: { type: String, required: true },
  bank: { type: String, required: true },
  hospital: { type: String, required: true },
  periodOfInsurance: { type: String, required: true },

  age: { type:Number, required: true },
  bmi: { type: Number, required: true },
  children: { type: Number, required: true },
  smoker: { type:Number, required: true },
  illness: { type: Number, required: true },
  //medical details
  // illness: { type: String, required: true },
  symptoms: { type: String, required: true },
  symptomsNoticeDate: { type: String, required: true },
  investigation: { type: String, required: true },
  doctorName: { type: String, required: true },
  visitDate: { type: String, required: true },
  frequencyOfVisits: { type: String, required: true },
  qualificationOfDoc: { type: String, required: true },
  addressOfHospital: { type: String, required: true },
  hospitalContact: { type: String, required: true },
  insurerName: { type: String, required: true },
  insuranceOfficeLocation: { type: String, required: true },
  
},{ timestamps: true });

const Form = mongoose.model("form", formSchema);

module.exports = Form;
