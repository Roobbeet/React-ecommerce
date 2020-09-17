import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {signUpStart} from '../../redux/user/user.actions'

import './sign-up.styles.scss';

const SignUp = ({signUpStart}) => {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         displayName: '',
    //         email: '',
    //         password: '',
    //         confirmPassword: '',
    //     }
    // }
    const [userData, setUserData] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const {displayName, email, password, confirmPassword} = userData;

    const handleSubmit = async event => {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            alert('Password failed');
            return;
        }
        signUpStart({displayName, email, password})
    }
        /*
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password) //method dari firebase.auth()

            await createUserProfileDocument(user, {displayName}); //bikin doc di firebase

            this.setState({ //biar formnya kosong lagi
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
            })
        } catch(error) {
            console.log(error);
        }
    };
    */

    const handleChange = event => { //biar kalo on change, kita langsung ganti setstate biar bisa masuk ke database
        const {name, value} = event.target;

        setUserData({...userData ,[name]: value})
    }

        return(
            <div className="sign-up">
                <h2 className="title">Do Not Have an Account?</h2>
                <span>Sign Up Now!</span>
                <form onSubmit={handleSubmit} className="sign-up">
                    <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name' required
                    ></FormInput>
                   <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email' required
                    ></FormInput>
                    <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='Password' required
                    ></FormInput>
                    <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password' required
                    ></FormInput>
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials)),
})

export default connect(null, mapDispatchToProps)(SignUp);