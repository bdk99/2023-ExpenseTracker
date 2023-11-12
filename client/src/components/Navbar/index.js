import React from 'react';
import {  Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import Logout from '../logout';
import "../../App.css";

const navbar= () =>{
	/*Updates profile page URL based on users username*/
	var incomesURL = '/incomes/'+ReactSession.get('username');
	var expensesURL = '/expenses/'+ReactSession.get('username');
	var budgetURL = '/budget/'+ReactSession.get('username');
	
	return (
	<div>
		{/* Shows the logged in session username above the NAVBAR for temporary testing and debugging purposes */}
		<ul className="topnav">
			<li>
				<Link to="/">Home</Link>
			</li>

			{/* <li>
				<Link to="/ingredientSearch">Ingredient Search</Link>
			</li> */}
			{/* <li>
				<Link to="/explore">Explore</Link>
			</li> */}

			<li>
				<Link to="/About-Us">About Me</Link>
			</li>
			<li>
				{/*Makes the navbar dynamic, displays the incomes button if the user is signed in*/}
				{(ReactSession.get('username') !== undefined) &&
					<Link to={incomesURL}>Incomes</Link>
				}
			</li>

			<li>
				{/*Makes the navbar dynamic, displays the expenses button if the user is signed in*/}
				{(ReactSession.get('username') !== undefined) &&
					<Link to={expensesURL}>Expenses</Link>
				}
			</li>

			<li>
				{/*Makes the navbar dynamic, displays the budget button if the user is signed in*/}
				{(ReactSession.get('username') !== undefined) &&
					<Link to={budgetURL}>Budget</Link>
				}
			</li>

			<li>
				{/*Makes the navbar dynamic, displays the addExpense button if the user is signed in*/}
				{(ReactSession.get('username') !== undefined) &&
					<Link to='/addExpense'>AddExpense</Link>
				}
			</li>

			{/*Makes the navbar dynamic, displays the login and signup buttons if the user is not signed in*/}
			{(ReactSession.get('username') === undefined) &&
			<li className ="right">
				<Link to="/signup">Sign Up</Link>
			</li>}

			{(ReactSession.get('username') === undefined) &&
			<li className ="right">
				<Link to="/login">Login</Link>
			</li>}

			{/*Makes the navbar dynamic, displays the logout button if the user is signed in*/}
			{(ReactSession.get('username') !== undefined) &&
				<Logout />
			}
		</ul>
	</div>
	);
  }
  export default navbar;