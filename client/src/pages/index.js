import React from "react";
import Navbar from '../components/Navbar';
import { useState, useEffect } from "react";
import axios from "axios";
const { serverAddress } = require('./config.json');

function Home() {
	const [listOfUsers, setListOfUsers] = useState([])

	useEffect(() => {
		console.log('Attempting to run useEffect')
		
		axios.post(serverAddress + "getUsers").then((res) => {
			console.log(res);
			setListOfUsers(res.data);
		}).catch((err) =>
		console.log(err.stack)
	)}, []
	)
	return (
		<div className='centereddiv'>

            {/*Imports navbar to the top of the page*/}
			<Navbar />

			<div className ="header">
				<h1>Expense Tracker</h1>
            </div>

			<div className="usersDisplay">
				{listOfUsers.map((user) => {
					return (
						<div>
							<h1>Name: {user.name}</h1>
							<h1>Username: {user.username}</h1>
							<h1>Email: {user.email}</h1>
						</div>
					)
				})}
			</div>
		</div>
	);
};

export default Home;