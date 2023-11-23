const express = require("express");
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const ExpenseModel = require('./models/Expenses');
const BudgetModel = require('./models/Budget');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bcrypt = require('bcrypt');
const router = express.Router();
const bodyParser = require("body-parser");
const { port, db, clientAddress } = require('./config.json');
const fs = require('fs');
const csv = require('fast-csv');

app.use("/",router);
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// default options for file upload using express-fileupload
app.use(fileUpload());

{/*Sets up connection to MongoDB database using mongoose library*/}
mongoose.connect(`${db}`);


{/*Function to getUsers from database for home page list*/}
app.post("/getUsers", (req, res) => {

  UserModel.find({}, (err, result) => {
    if(err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })
});



{/*Function to getUser from database based on username*/}
app.post("/loginUser", (req, res) => {
  const output = req.body;

  UserModel.findOne({ username: output.username }, function (err, user) {
    
    if (err || user == null) {
      compareResult = false;
      res.send(compareResult);
    }
    else{
      res.send(user);
    }
  });
});




{/*Function to verify username, reset password and change users recoveryCode if emailed code matches stored code*/}
app.post("/passwordResetBackend", async (req, res) => {
  const output = req.body;

  UserModel.findOne({ username: output.username }, async function (err, result) {
    
    if (err || result == null) 
    {
      //If user entered username does not match any results in the database, return false and do not continue
      res.send(false);
    }
    else
    {
      //Encrypts new password before entering it into database
      const salt = await bcrypt.genSalt(10);
      const newpassword = await bcrypt.hash(output.password, salt);
      if(output.recoveryCode==result.recoveryCode)
      {
        //Updates RecoveryCode with new random number string
        const newRecoveryCode = (Math.floor(Math.random() * (9999999 - 1000000) + 1000000)); 

        //Creates editUser object similar to when we edit user profiles
        var editUser = {
          password: newpassword,
          recoveryCode: newRecoveryCode
        };

        //Find user based on unique username, and update the variables set in the editUser object above
        UserModel.findOneAndUpdate(
          { username: output.username }, 
          { $set: editUser },
        ).then(post => {});

        //Reply back to the frontend that the password was successfully changed and the 
        res.send(true);
      }
      else //If saved recoveryCode does not match entered RecoveryCode, return false (invalid recoveryCode entry)
      {
        res.send(false);
      }
    }
  });
});

{/*Function to connect to email servers, and send user recovery code based on the users username*/}
{/*PLEASE NOTE THAT THIS FUNCTION WILL ONLY WORK ON THE MAIN SERVER*/}
app.post("/emailReset", async (req, res) => {
  const output = req.body;

  UserModel.findOne({ username: output.username }, function (err, result) {
    if (err || result == null) 
    {
      //If user entered username does not match any results in the database, return false and do not continue
      res.send(false);
    }
    else
    {
      //Start of connection to email servers and setup credientials to connect to gmail servers
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: ("COSC481GigaBites@gmail.com"),
          pass: (`${pass}`)
        }
      });

      //Sets up mailOptions and parameters before sending email
      var mailOptions = {
        from: "COSC481GigaBites@gmail.com",
        to: result.email,
        subject: "Password Reset",
        html: ('<p>Hello '+result.name+', Your recovery code is: '+result.recoveryCode +"</p>Sincerely,<br/>GigaBites.org")
      };

      //Sends the actual email using the above mailOptions
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Password Reset email sent to: '+ result.email);
          console.log('Email sent: ' + info.response);
        }
      });
      res.send(true);
    }
  });
});


{/*Verification request from front-end client to see if the username entered on the signup page is unique or not*/}
app.post("/createUser", async (req, res) => {
  const user = req.body;
  console.log(user);
  console.log(`accessing backend createUser function....`)
  if(user.password == '')
    return;
  //function to check if username exists 
  const existUsername = await UserModel.findOne({ username: req.body.username })
  if (existUsername) {
    res.send(false);
  }
  else {
    const newUser = new UserModel(user);
    await newUser.save();
    res.send(true);
  }
});



{/*Function to see if the password entered on the login page actually matches the encrypted username in the database*/}
app.post("/passwordValidation", (req, res) => {
  const output = req.body;

  UserModel.findOne({ username: output.username }, function (err, user) {
    
    if (err || user == null) {
      compareResult = false;
      res.send(compareResult);
    }
    else{
    hash = user.password;

    var password = output.password;
    bcrypt.compare(password, hash, function(err, result) {
      if (err) return handleError(err);

      compareResult = result;
      res.send(compareResult);
    });
  }
  });
});



{/*Takes the add Expense data from client, and adds it to mongoDB using Expenses model*/}
app.post("/addExpenseToBackend", async (req, res) => {
  const expense = req.body;
  console.log(expense);

  const newExpense = new ExpenseModel(expense);
  await newExpense.save();
  res.send(true);
});

{/*Gets expenses from MongoDB database based on the logged in users username*/}
app.post("/getExpenses", (req, res) => {
  const output = req.body;
  var mysort = { date: -1 };

    ExpenseModel.find({ username: output.username }, function (err, expenses) {
      if (err || expenses == null) 
      {
        console.log('Error in backend')
      }
      else
      {
        res.send(expenses);
      }
  }).sort(mysort);
});



{/*Gets budget from MongoDB database based on the logged in users username*/}
app.post("/getBudget", (req, res) => {
  const output = req.body;

    BudgetModel.find({ username: output.username }, function (err, budgets) {
      if (err || budgets == null) 
      {
        console.log('Error in backend in getBudget function')
      }
      else
      {
        res.send(budgets);
      }
  });
});



var transactionDate = '';
var postDate = '';
var amount = '';
var category = '';
var account = '';
var addNewExpense = {};
var entryDate;

{/*Takes the add Expense CSV data from client, and adds it to mongoDB using Expense model*/}
app.post("/backendExpensesCSV", async function(req, res){
  console.log(req.body);

  //Gets file name and type of uploaded file from front-end and saves it on server temporarily for later parsing
  let sampleFile;
  let uploadPath;

  sampleFile = req.files.sampleFile;

  let arr = sampleFile.name.split(".");
  let ext = arr.pop();
  sampleFile.name = "test."+ext;

  uploadPath = '../client/public/' + sampleFile.name;


  // Moves file to backend server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
      console.log('File '+sampleFile.name+' uploaded!');
  });


  // // options which needed for the fast-csv
  const options = { headers: true, trim: true, delimiter: "," } 

  // Reads CSV file from stream, and adds documents to DB one row at a time
  fs.createReadStream(uploadPath)
  .pipe(csv.parse(options))
  .on('error', error => console.log(error))
  .on('data', (row) => {

    transactionDate = `${row["Trans. Date"]}`;
    postDate = `${row["Post Date"]}`;
    description = `${row["Description"]}`;
    amount = `${row["Amount"]}`;
    category = `${row["Category"]}`;
    account = `${row["Account"]}`;

    addNewExpense = {
      username: req.body.username,
      amount: amount,
      description: description,
      category: category,
      reciept: 'N',
      account: account,
      date: transactionDate,
    };

    ExpenseModel.create(addNewExpense).then(
    ).catch(function (error) {
      console.log(error);
    })

  })
  .on('end', (rowCount) => console.log(`Parsed ${rowCount} rows`))

});




{/*Displays running state of server in console, along with the currently running port number*/}
app.listen(`${port}`, () => {
    console.log("SERVER RUNS PERFECTLY!");
    console.log(`Server running on port ${port}`);
});