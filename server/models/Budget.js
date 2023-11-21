//A model used to keep the document records in the database consistent
const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  username: {
    type: String
  },
  Expense: {
    type: String
  },
  Amount: {
    type: Number
  },
  Monthly: {
    type: String
  }
});

const BudgetModel = mongoose.model("budgets", budgetSchema);
module.exports = BudgetModel;