import React from 'react';
import '../sign-in/sign-in.styles.scss';
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInGoogle } from '../firebase/firebase.utils'

class SignIn extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            email: '',
            password: '',
        };
    }
    handleSubmit = async event => {
        event.preventDefault();
        const {email, password} = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email:'', password:''});
        } catch (error) {
            console.log(error)
        }
    }
    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({[name]: value});
    }
    render() {
        return (
            <div className="sign-in">
                <h2>Already Have Account?</h2>
                <span>Sign in with your email</span>

             <form onSubmit={this.handleSubmit}>

                 <FormInput name='email' type='email'
                  value={this.state.email}
                  handleChange={this.handleChange}
                  label='email'
                  required/>
            

                 <FormInput name='password' value={this.state.password}
                 handleChange={this.handleChange} label='password'
                 required/>

                <div className="buttons">
                <CustomButton type='submit'>Sign In</CustomButton>
                 <CustomButton type='button' onClick={ signInGoogle } isGoogleSignIn>Sign In With google!</CustomButton>
                </div>
                 
             </form>
            </div>
        )
    }
}
export default SignIn;