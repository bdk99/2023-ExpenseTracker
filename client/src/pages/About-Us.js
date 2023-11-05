import "../App.css";
import React from "react";
import Navbar from '../components/Navbar';


function GithubURL(path)
{
	window.location.href = path;	  
}

const AboutUs = () => {
	return (
		<div className="App">
			{/*Imports navbar to the top of the page*/}
			<Navbar />
			<div className ="header">
				
				<h1>About Me!</h1>
				<h5>Developer Information</h5>
			</div>
				<div className="border">
				{/* Each developer and there relevant info becomes displayed */}
				
					<table className="normal">
					<tbody>
						<tr>
							<td>
								<div className="borderStyle">
								<div className="about"></div>
								</div>
							</td>
							<td>
								<div className="centeredAboutus">
									<h1>Brendan Klein</h1>
									<h3>Aspiring full stack developer</h3>
									<h3><button className="aboutus" onClick={() => GithubURL('https://github.com/bdk99')} >Github</button></h3>
								</div>
							</td>
						</tr>
					</tbody>
					</table>
				</div>
		</div>
	);

};

export default AboutUs;
