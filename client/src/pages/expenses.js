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

               <table className='centeredExpenses'>
                     <tr>
                        <th>Date</th>
                        <th>Amount</th>
                     </tr>
                  {listOfExpenses.map((expense) => {
                     return (
                        <tr>
                           <td>{expense.date.substring(0,10)}</td>
                           <td>{expense.amount}</td>
                        </tr>
                     )
                     })}
               </table>
            </div>
		</div>
	);
};

export default Expenses;