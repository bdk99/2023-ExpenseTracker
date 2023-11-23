import "../App.css";
import React from 'react';
import Navbar from '../components/Navbar';
import { useState, useEffect } from "react";
import axios from "axios";
import { ReactSession } from 'react-client-session';
const { serverAddress } = require('./config.json');

//const fs = require('js');
//const csv = require('fast-csv');

function Expenses(){ 
	const [listOfExpenses, setListOfExpenses] = useState([])

	useEffect(() => {
		axios.post(serverAddress + "getExpenses", {
         username: ReactSession.get('username'),
      }).then((res) => {
			setListOfExpenses(res.data);
		}).catch((err) =>
		console.log(err.stack)
	)}, []
	)
   
	return (
        <div className="centereddiv">
            {/*Imports navbar to the top of the page*/}
            <Navbar />

            <div className ="header">
				   <h1>Expenses</h1>
            </div>

            <table className='centeredExpenses'>
                  <tr>
                     <th className="expensesTable">Date</th>
                     <th className="expensesTable">Amount</th>
                     <th className="expensesTable">Description</th>
                     <th className="expensesTable">Category</th>
                     <th className="expensesTable">Account</th>
                  </tr>
               {listOfExpenses.map((expense) => {
                  return (
                     <tr>
                        <td className='expensesTable'>{expense.date.substring(0,10)}</td>
                        <td className='expensesTable'>{expense.amount}</td>
                        <td className='expensesTable'>{expense.description}</td>
                        <td className='expensesTable'>{expense.category}</td>
                        <td className='expensesTable'>{expense.account}</td>
                     </tr>
                  )
                  })}
            </table>
		</div>
	);
};

export default Expenses;