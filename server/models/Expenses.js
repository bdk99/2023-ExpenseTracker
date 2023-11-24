//A model used to keep the document records in the database consistent
const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  entryDate: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  reciept: {
    type: String,
  },
  account: {
    type:String,
  },
  date: {
    type: Date,
  },
});

const ExpenseModel = mongoose.model("expenses", expensesSchema);
module.exports = ExpenseModel;