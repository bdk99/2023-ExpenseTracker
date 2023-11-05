import React from "react";
import Navbar from '../components/Navbar';
import { useState, useEffect } from "react";
import axios from "axios";
// const { serverAddress } = require('./config.json');

function Home() {
	const [listOfUsers, setListOfUsers] = useState([])

	useEffect(() => {
		axios.get("http://www.gigabites.org:3001/getUsers").then((res) => {
			console.log(res);
			setListOfUsers(res.data);
		})
	}, [])

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