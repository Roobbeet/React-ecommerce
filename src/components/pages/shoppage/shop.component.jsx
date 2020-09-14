import React from 'react';
import {Route} from 'react-router-dom'

import CollectionsOverviewContainer from '../../collections-overview/collection-overview.container';
import CollectionPageContainer from '../../pages/collection/collection.container'


import {connect} from 'react-redux'
import { fetchCollectionsStartAsync } from '../../../redux/shop/shop.actions';




//karena mau route per kategori, makanya dibikin collection overview
class ShopPage extends React.Component {
    state = {
        loading: true
    }; //this way, React already know that we want to use constructor and super.

    unsubscribeFromSnapshot= null;

    componentDidMount() {
        //pake non thunk udh pindah ke shop.action.js
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
        
        /*
        //To fetch from our database, but the collections is extremely nested
        //Gonna use snapshot of the database instead of this API method
        fetch(`https://firestore.googleapis.com/v1/projects/ecommercedb-a20e3/databases/(default)/documents/collections`)
        .then(resp=> resp.json())
        .then(collections => console.log(collections))
        */
    }
    //observable Pattern pake onSnapshot, kalo Promise pake .get()
    //.get() adalah Promise, jadi pake .then buat pake promise tersebut
    

    render() {
        const {match, isCollectionsLoaded} = this.props

        return (
        <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />

        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
            </div>    
        )
    }//isCollectionsLoaded dibalik karena collections ada = ga loading
}


/*
REMINDER: FUNCTIONAL COMPONENT

const ShopPage  = ({match}) => (
    <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
            </div>
)

*/

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null, mapDispatchToProps)(ShopPage);