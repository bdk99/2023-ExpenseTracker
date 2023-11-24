import React from "react";
import Navbar from '../components/Navbar';
import { ReactSession } from 'react-client-session';

ReactSession.set("username", 'bklein');

function Home() {

	return (
		<div className='centereddiv'>

            {/*Imports navbar to the top of the page*/}
			<Navbar />

			<div className ="header">
				<h1>Expense Tracker</h1>
            
			<h3>Welcome to my custom expense tracker!</h3>
			<h3>Please use the navbar above to work with your expenses! </h3>
			</div>
			
		</div>
	);
};

export default Home;