import React, { Component } from 'react';
//importar cosas de diseño
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { makeStyles } from 'material-ui/styles';
import './login.css';
import '../index.css'


export class FormDetailUser extends Component {
	continue = e => {
		e.preventDefault();
		/*en User form se pasa:
		nextStep = {this.nextStep}
		handleChange = {this.handleChange}
		values={values}*/
		//con props se recupera
		this.props.nextStep(); 		
	}

	render(){
		const { values, handleChange } = this.props;
		return(
			<MuiThemeProvider>
				
					<div class="form">
						<TextField
							id="red"
							label="Outlined" variant="outlined"
							hintText="First Name"
							floadingLabelText="First Name"
							onChange={handleChange('firstName')}
							defaultValue={values.firstName}

						/>
						<br/>
						<TextField
							hintText="Last Name"
							floadingLabelText="Last Name"
							onChange={handleChange('lastName')}
							defaultValue={values.lastName}
						/>
						<br/>
						<TextField
							hintText="Email"
							floadingLabelText="Email"
							onChange={handleChange('email')}
							defaultValue={values.email}
						/>
						<br/>
						
						 <br/>
						<RaisedButton 
							label="Continue"
							primary={true} //true = ponerle color
							style={styles.button}
							onClick={this.continue}
						/>
					</div>

				
			</MuiThemeProvider>
		);
	}

}

const styles = {
	button: {
		margin:15
	}
	
}



export default FormDetailUser