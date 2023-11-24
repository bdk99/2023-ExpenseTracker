import "../App.css";
import React from "react";
import Navbar from '../components/Navbar';
import { useState, useEffect } from "react";
import axios from "axios";
import { ReactSession } from 'react-client-session';
const { serverAddress } = require('./config.json');

var totalPerRow = 0;
var yearlyTotal = 0;

function Budget () {
const [listOfBudgetItems, setListOfBudgetItems] = useState([])
const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		axios.post(serverAddress + "getBudget", {
         username: ReactSession.get('username'),
      }).then((res) => {
			setListOfBudgetItems(res.data);
            setLoading(false);
		}).catch((err) =>
		console.log(err.stack)
	)}, []
	)

	if (isLoading) { 
        yearlyTotal = 0;
        return <div className="App">Loading...</div>; 
    }

	return (
        <div className="centereddiv">
            {/*Imports navbar to the top of the page*/}
            <Navbar />

            <div className ="header">
				   <h1>Budget</h1>
            </div>
            <div className="contentBody">
               <table className='centeredExpenses'>
                     <tr>
                        <th className='budgetTable'><h2>Expense</h2></th>
                        <th className='budgetTable'><h2>Amount</h2></th>
                        <th className='budgetTable'><h2>Monthly (Y/N)</h2></th>
                        <th className='budgetTable'><h2>Yearly Total</h2></th>
                     </tr>
                  {listOfBudgetItems.map((budgetItem) => {

                    totalPerRow=0;
                    if(budgetItem.Monthly === 'Yes')
                        totalPerRow=budgetItem.Amount * 12;
                    else
                        totalPerRow=budgetItem.Amount;

                        yearlyTotal = yearlyTotal+totalPerRow;

                     return (
                        <tr>
                           <td className='budgetTable'>{budgetItem.Expense}</td>
                           <td className='budgetTable'>${budgetItem.Amount}</td>
                           <td className='budgetTable'>{budgetItem.Monthly}</td>
                           <td className='budgetTable'>${totalPerRow}</td>
                        </tr>
                     )
                     })}
                    <tr>
                        <td className='budgetTableEnd'>-</td>
                        <td className='budgetTableEnd'>-</td>
                        <td className='budgetTableEnd'>-</td>
                        <td className='budgetTableEnd'>-</td>
                    </tr>
                    <tr>
                        <td className='budgetTable'>Yearly Total</td>
                        <td className='budgetTable'></td>
                        <td className='budgetTable'></td>
                        <td className='budgetTable'>${yearlyTotal}</td>
                    </tr>
               </table>
            </div>
		</div>
	);
};

export default Budget;