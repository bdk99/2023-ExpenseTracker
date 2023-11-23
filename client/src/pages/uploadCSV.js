import "../App.css";
import React from 'react';
import Navbar from '../components/Navbar';
import { ReactSession } from 'react-client-session';
const { serverAddress } = require('./config.json');

class AddExpensesCSV extends React.Component {
    constructor(val) {
        super(val);
        this.state = {
            username: ReactSession.get("username"),
        };
    }

    render()
    {
        return (
            <div className="App">
                {/*Imports navbar to the top of the page*/}
                <Navbar />
                <div className ="header"> <h1>Upload Expense CSV</h1> </div>

                <form ref='uploadForm' id='uploadForm' action={serverAddress+"backendExpensesCSV"} method='post' encType="multipart/form-data">
                    
                    <textarea className="editBio" name="username" id='username' type="text" value={this.state.username} onChange={this.handleUsernameChange} hidden/>
                    
                    <input type="file" name="sampleFile" accept="*.csv"/> 

                    <button className="btn" type="submit">Upload CSV</button>
                </form>
            </div>
        );
    }
}
  export default AddExpensesCSV;