import "../App.css";
import axios from "axios";
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
//eslint-disable-next-line
import { ReactSession } from 'react-client-session';
import Select from 'react-select'

const categoryOptions = [
  { value: 'Automotive', label: 'Automotive' },
  { value: 'Camping', label: 'Camping' },
  { value: 'Chase Payment', label: 'Chase Payment' },
  { value: 'Decoration', label: 'Decoration' },
  { value: 'Development', label: 'Development' },
  { value: 'Discover Payment', label: 'Discover Payment' },
  { value: 'EMU', label: 'EMU' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Food', label: 'Food' },
  { value: 'Gasoline', label: 'Gasoline' },
  { value: 'Gift', label: 'Gift' },
  { value: 'Golden', label: 'Golden' },
  { value: 'Groceries', label: 'Groceries' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Insurance', label: 'Insurance' },
  { value: 'Katie', label: 'Katie' },
  { value: 'Lifestyle', label: 'Lifestyle' },
  { value: 'Membership', label: 'Membership' },
  { value: 'Rental', label: 'Rental' },
  { value: 'Tools', label: 'Tools' },
  { value: 'Warrenty', label: 'Warrenty' } ];

const recieptOptions = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' } ];

const accountOptions = [
  { value: 'Checking', label: 'Checking' },
  { value: 'Savings', label: 'Savings' },
  { value: 'Visa', label: 'Visa' },
  { value: 'Discover', label: 'Discover' }  ];

const { serverAddress } = require('./config.json');

class addExpense extends React.Component
{
    constructor(val) 
    {
        super(val);
        this.state = {date: '', amount: '', description: '', category: '', reciept: '', account: '', redirect: false};

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleRecieptChange = this.handleRecieptChange.bind(this);
        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Function executes whenever user changes the date field
    handleDateChange(event) {
    this.setState({date: event.target.value});
    }

    //Function executes whenever user changes the amount textfield
    handleAmountChange(event) {
    this.setState({amount: event.target.value});
    }

    //Function executes whenever user changes the amount textfield
    handleDescriptionChange(event) {
    this.setState({description: event.target.value});
    }

    //Function executes whenever user changes the Category dropdown
    handleCategoryChange(event) {
    this.setState({category: event.target.value});
    }

    //Function executes whenever user changes the Category dropdown
    handleRecieptChange(event) {
    this.setState({reciept: event.target.value});
    }

    //Function executes whenever user changes the Category dropdown
    handleAccountChange(event) {
    this.setState({account: event.target.value});
    }

  handleSubmit(event) 
  {
    if(this.state.date === '' || this.state.amount === '') {
      alert("Missing some information! Please try again.");
      return;
    }
    else
    {
      axios.post((serverAddress+"addExpenseToBackend"), {
        username: ReactSession.get('username'),
        date: this.state.date,
        amount: this.state.amount,
        description: this.state.description,
        category: this.state.category,
        reciept: this.state.reciept,
        account: this.state.account,
      }).then((res) => {
        if(res.data === true) {
          alert("Expense Successfully added");
          setTimeout(() => { this.setState({redirect: true}); }, 200);
        }
        else if(res.data === false) {
          console.log("Add Expense Failed!  Please try again");
        }
      });
    }
    event.preventDefault();
  }
  render(){
    if(this.state.redirect){
      return(
        <div>
          <Navigate to='../' />
        </div>
      );
    }
    else{
      return ( 
          <form onSubmit={this.handleSubmit}>
            {/*Imports navbar to the top of the page*/}
            <Navbar />
            <div className="App" >
              <div className ="header">
                <h1>Add Expense(s)</h1>
                <h3>Use this page to be able to add expenses</h3>
              </div>
    
              <div className="border">
                <table className="normal">

                {/*Date*/}
                  <tbody>
                    <tr>
                      <td>
                        <label className="label">Date</label>
                        <input className="textbox" type="date" id='date' value={this.state.date} onChange={this.handleDateChange} required/>
                      </td>
                    </tr>
                  </tbody>

                {/*Amount*/}
                  <tbody>
                    <tr>
                      <td>
                        <label className="label">Amount</label>
                        <input className="textbox" type="number" id='amount' value={this.state.amount} onChange={this.handleAmountChange} required/>
                      </td>
                    </tr>
                  </tbody>

                {/*Description*/}
                  <tbody>
                    <tr>
                      <td>
                        <label className="label">Description</label>
                        <input className="textbox" type="text" id='description' value={this.state.description} onChange={this.handleDescriptionChange} required/>
                      </td>
                    </tr>
                  </tbody>

                {/*Category*/}
                  <tbody>
                    <tr>
                      <td>
                        <label className="label">Category</label>
                        <Select options={categoryOptions} id='category' value={this.state.category} onChange={this.handleCategoryChange}required/>
                      </td>
                    </tr>
                  </tbody>

                {/*Reciept*/}
                  <tbody>
                    <tr>
                      <td>
                        <label className="label">Reciept</label>
                        <Select options={recieptOptions} id='reciept' value={this.state.reciept} onChange={this.handleRecieptChange} required/>
                      </td>
                    </tr>
                  </tbody>
    
    
                {/*Account*/}
                  <tbody>
                    <tr>
                      <td>
                        <label className="label">Account</label>
                        <Select options={accountOptions} id='account' value={this.state.account} onChange={this.handleAccountChange} required/>
                      </td>
                    </tr>
                  </tbody>

                </table>
    
                <button className="btn"> Submit </button>
              </div>
    
            </div>
          </form>
      );
    }
  }
}
  
  export default addExpense;