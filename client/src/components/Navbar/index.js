import React from 'react';
import {  Link } from "react-router-dom";
import "../../App.css";

const navbar= () =>{
	/*Updates profile page URL based on users username*/
	//var finalURL = '/profile/';
	
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
			{/*Makes the navbar dynamic, displays the login and signup buttons if the user is not signed in*/}
			<li className ="right">
				<Link to="/signup">Sign Up</Link>
			</li>

			<li className ="right">
				<Link to="/login">Login</Link>
			</li>
			
			{/* <li>
				<Link to={finalURL}>Profile</Link>
			</li> */}
		</ul>
	</div>
	);
  }
  export default navbar;