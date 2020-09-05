import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, createUserProfileDocument} from '../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert('Password failed');
            return;
        }
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

    handleChange = event => { //biar kalo on change, kita langsung ganti setstate biar bisa masuk ke database
        const {name, value} = event.target;

        this.setState({[name]: value})
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className="sign-up">
                <h2 className="title">Do Not Have an Account?</h2>
                <span>Sign Up Now!</span>
                <form onSubmit={this.handleSubmit} className="sign-up">
                    <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={this.handleChange}
                    label='Display Name' required
                    ></FormInput>
                   <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                    label='Email' required
                    ></FormInput>
                    <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleChange}
                    label='Password' required
                    ></FormInput>
                    <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={this.handleChange}
                    label='Confirm Password' required
                    ></FormInput>
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;