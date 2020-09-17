import React, {useEffect, useState} from 'react';
import {Route} from 'react-router-dom'

import CollectionsOverviewContainer from '../../collections-overview/collection-overview.container';
import CollectionPageContainer from '../../pages/collection/collection.container'


import {connect} from 'react-redux'
import { fetchCollectionsStart } from '../../../redux/shop/shop.actions';


const ShopPage = ({fetchCollectionsStart, match, isCollectionsLoaded}) => {

    const unsubscribeFromSnapshot= null;

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCollectionsStart(); 
    }, [fetchCollectionsStart])
        //pake non thunk udh pindah ke shop.action.js
    useEffect(() => {
        return () => unsubscribeFromSnapshot;
    }, [])

        return (
        <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />

        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
            </div>    
        )
//isCollectionsLoaded dibalik karena collections ada = ga loading
}




const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);

//NOTES
/*
        To fetch from our database, but the collections is extremely nested
        Gonna use snapshot of the database instead of this API method
        fetch(`https://firestore.googleapis.com/v1/projects/ecommercedb-a20e3/databases/(default)/documents/collections`)
        .then(resp=> resp.json())
        .then(collections => console.log(collections))
*/

    //observable Pattern pake onSnapshot, kalo Promise pake .get()
    //.get() adalah Promise, jadi pake .then buat pake promise tersebut

/*
REMINDER: FUNCTIONAL COMPONENT

const ShopPage  = ({match}) => (
    <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
            </div>
)

*/