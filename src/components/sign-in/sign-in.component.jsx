import React, {useState, useEffect} from 'react';
import '../sign-in/sign-in.styles.scss';
import {connect} from 'react-redux';
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component';
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'

const SignIn = ({emailSignInStart, googleSignInStart}) => { //destructuring props
    /*
    constructor(props) {
        super(props);


        this.state = {
            email: '',
            password: '',
        };
    }
    */
    const [userCredentials, setCredentials] = useState({email: '', password: ''});
    const {email, password} = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();
    
        emailSignInStart(email, password)
    }

    const handleChange = (event) => {
        const { value, name } = event.target;
        setCredentials({...userCredentials, [name]: value}); //spread biar nilainya tetep disitu
    }

        return (
            <div className="sign-in">
                <h2>Already Have Account?</h2>
                <span>Sign in with your email</span>

             <form onSubmit={handleSubmit}>

                 <FormInput name='email' type='email'
                  value={email}
                  handleChange={handleChange}
                  label='email'
                  required/>
            

                 <FormInput name='password' value={password}
                 handleChange={handleChange} label='password'
                 required/>

                <div className="buttons">
                <CustomButton type='submit'>Sign In</CustomButton>
                 <CustomButton type='button' onClick={ googleSignInStart } isGoogleSignIn>Sign In With google!</CustomButton>
                </div>
                 
             </form>
            </div>
        )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({email, password})),
})

export default connect(null, mapDispatchToProps)(SignIn);