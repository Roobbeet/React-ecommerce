import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selector'
 

const Header = ({ currentUser, isSignIn, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
    <div className="options">
        <Link className='option' to='/shop'>SHOP</Link>
        <Link className='option' to='/shop'>CONTACT</Link>
        {
            currentUser ?
            <Link className='option' to='/' onClick={() => auth.signOut()}>SIGN OUT</Link>
            :
            <Link className='option' to='/login'>SIGN IN</Link>
        }
        <CartIcon />
    </div>
    {
        hidden ? null : <CartDropdown /> 
    }
    </div>
)
//CARA PAKE STATE YG ADA DI REDUCER --> connect()
const mapStateToProps = createStructuredSelector({ //state will be root reducer
    currentUser: selectCurrentUser,
    hidden: selectCartHidden, //kalo diliat, ini bakal ngarah ke currentUsernya user reducer
    //pengganti old style state and pass the state dengan createStructuredSelector
    //createStructuredSelector ngambil top level state dan ngepass ke dalem
})

export default connect(mapStateToProps)(Header);
//connect: 1st arg function yg ngasih akses ke state, 2nd arg yang mau pake state