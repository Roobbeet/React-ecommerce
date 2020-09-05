import React from 'react';
import './sign-in-up.styles.scss';
import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component'

const SignInUpPage = () => (

    <div className="sign-in-and-sign-up">
        <SignIn />
        <SignUp />

    </div>


)

export default SignInUpPage;