import React, {Component} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ReactSession } from 'react-client-session';

import Home from './pages';
import SignUp from './pages/signup';
import Login from './pages/login';
import PasswordReset from './pages/passwordReset';
import ForgotPassword from './pages/forgotPassword';
import LoggedOut from './pages/loggedout';
import AboutUs from './pages/About-Us';
import Incomes from './pages/incomes';
import Expenses from './pages/expenses';
import AddExpenses from './pages/addExpense';
import Budget from './pages/budget';

//Sets storage type for session variables
ReactSession.setStoreType('localStorage');

/*Updates profile page URL based on users username*/
function User() 
{
  return ReactSession.get('username');
}

class App extends Component {
  render () {
    return (
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/passwordReset' element={<PasswordReset/>} />
          <Route path='/forgotPassword' element={<ForgotPassword/>} />
          <Route path='/loggedout' element={<LoggedOut/>} />
          <Route path='/About-Us' element={<AboutUs/>} />
          <Route path='/expenses/:username' component={User} element={<Expenses/>} />
          <Route path='/incomes/:username' component={User} element={<Incomes/>} />
          <Route path='/addExpense' element={<AddExpenses/>} />
          <Route path='/budget' element={<Budget/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;
