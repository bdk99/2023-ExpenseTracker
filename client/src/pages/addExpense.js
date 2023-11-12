import "../App.css";
import React from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
//eslint-disable-next-line
import { ReactSession } from 'react-client-session';
const { serverAddress } = require('./config.json');


class addExpense extends React.Component
{
    constructor(val) 
    {
        super(val);
        this.state = {date: '', amount: '', description: '', redirect: false};

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
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
        description: this.state.description
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
                <h1>Add Expense</h1>
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