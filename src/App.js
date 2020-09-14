import React, { } from 'react';
import styled from 'styled-components'; //css in js library
import './App.css';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions'
import HomePage from './components/pages/homepage/homepage.component'
import { Switch, Route, Redirect } from 'react-router-dom'; //Link digunakan buat ngasih link /// withRouter digunakan untuk pass property yg jauh diatasnya dia (tanpa harus bikin props tunnel)
import ShopPage from './components/pages/shoppage/shop.component';
import Header from './components/header/header.component'
import SignInUpPage from './components/sign-in-up/sign-in-up.component';
import { auth, createUserProfileDocument, addCOllectionAndDocuments } from './components/firebase/firebase.utils';
import CheckoutPage from '../src/components/pages/checkout/checkout.component';
import { selectCollectionsForPreview, selectShopCollections, selectShop} from './redux/shop/shop.selector'
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';

//styled component bikin komponen mini jsx dengan style contoh nama componentnya text, kita bakal specify dengan style.el = isi style. cara pakenya <el>isi element</el>.

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this function is to set current user everytime we refresh --> got from firebase
       if (userAuth) {
         const userRef = await createUserProfileDocument(userAuth);
 
         userRef.onSnapshot(snapShot => { //bakal fire tiap document update
           setCurrentUser({ //gantiin this.setState jadi function this.props.setCurrentUser ---> asalnya dari user.action.js
 
             currentUser: {
               id: snapShot.id,
               ...snapShot.data(),
             }
           })
         })
       }
         setCurrentUser(userAuth);
       }) //our action is fired twice, 1 untuk snapshot dan dapetin data ke firebase, 1 login

    //common algoritm for subscription ---> observable / listener / observer

  }


  //observable pattern
/*
-Observable Pattern-

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
     //this function is to set current user everytime we refresh --> got from firebase
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => { //bakal fire tiap document update
          setCurrentUser({ //gantiin this.setState jadi function this.props.setCurrentUser ---> asalnya dari user.action.js

            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            }
          })
        })
      }
        setCurrentUser(userAuth);
        //kalo mau masukin ke firebase firestore
        addCOllectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items}))) //biar cuma nyimpen title sama itemsnya aja
      }) //our action is fired twice, 1 untuk snapshot dan dapetin data ke firebase, 1 login
    
*/

  /*
  ada 2 jenis listener yg biasa dipake:
  1. Observable/observer Pattern --> yang dipake di contoh
  2. Promise Pattern --> Ada di ShopPage, pake .get().then instead of .onSnapshot
  */
  
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
  return (
      <div className='App'>
        <Header />
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage}/>
      <Route exact path='/login' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInUpPage />)} id='0'/>
      <Route exact path='/checkout' component={CheckoutPage} id='1'/>

    </Switch>
    
    </div>
    )
  };  
  }  

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  shopCollections: selectShopCollections,
  collectionsArray: selectCollectionsForPreview,
})
//INGAT! harus pake createStructuredSelector biar gausah pass object lagi
//kalo ga, nanti undefined karena js gatau ngambilnya dari mana
  
const mapDispatchToProps = dispatch => ({ //return prop that we want to pass
  setCurrentUser: user => dispatch(setCurrentUser(user)) //payloadnya adalah user
})

export default connect(mapStateToProps, mapDispatchToProps)(App); 
//connect(arg1, arg2) --> arg1 adalah mapStateToProps, arg2 adalah mapDispatchToProps. Kalo tidak butuh mapStateToProps, makanya arg1nya null

/*
-extensible code-
reusable code that not that long (less than hundreds)
can be used in the future as well
*/

/*
React Route:
<Route exact=true/false path='pathname' component={componentName} />
props cuma dikasih ke yg dipass pertama

React bakal cuma render yg ketemu pertama (kalo ada exact)

1. exact buat nentuin urlnya harus persis atau engga, kalo ga exact nanti bakal ikutan dirender komponennya
2. component adalah yg mau masuk di function/class tersebut
3. path adalah pathname setelah main domain
contoh localhost:3000/topics/:topicsID ---> :topicsID disebut route/url parameter, dynamicly changed

component dikasih 3 properti:
1. history
buat bikin back page berhasil
2. location
pathname, hash, search, dan state
3. match
ada url, path, parameter, dan isExact


Cara gunain link:
<Link to='url'>Text<Link> Link cuma hijack url dan ga bisa ngasih back

untuk menggunakan back, kita bisa modif object history dari dalem properti

cara:
onClick={() => props.history.push('link)}


-REDUX-
state management
only 1 massive object that holds state

why?
good large state management
useful to share data between components

3 principles:
1. single source of truth
2. state is read only
3. changes using pure functions (root reducer) --> function yg punya output sama terus kalo inputnya

redux doesn't remove state completely, masih bisa naro state di component react

multiple user state: bad habit
*/