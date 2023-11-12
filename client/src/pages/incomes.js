import React from 'react';
import Navbar from '../components/Navbar';

// eslint-disable-next-line
import { ReactSession } from 'react-client-session';

//const fs = require('js');
//const csv = require('fast-csv');

const Incomes = () => { 

	return (
        <div className="centereddiv">
            {/*Imports navbar to the top of the page*/}
            <Navbar />

            <div className ="header">
				<h1>Income</h1>
            </div>
		</div>
	);
};

export default Incomes;