//A model used to keep the document records in the database consistent
const mongoose = require("mongoose");

const incomesSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  entryDate: {
    type: Date,
    default: Date.now
  },
  value: {
    type: Number,
  },
  category: {
    type: String
  },
  date: {
    type: Date,
  },

});

const IncomeModel = mongoose.model("incomes", incomesSchema);
module.exports = IncomeModel;