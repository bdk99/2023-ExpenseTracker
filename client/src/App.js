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
//import GetUser from './pages/getuser';

//Sets storage type for session variables
ReactSession.setStoreType('localStorage');

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
          {/* <Route path='/getuser' element={<GetUser/>} /> */}
        </Routes>
      </Router>
    );
  }
}

export default App;
