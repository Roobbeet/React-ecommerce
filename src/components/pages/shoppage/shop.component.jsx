import React from 'react';
import {Route} from 'react-router-dom'
import CollectionOverview from '../../collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component';

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

import {connect} from 'react-redux'
import { updateCollections } from '../../../redux/shop/shop.actions';

import WithSpinner from '../../with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);


//karena mau route per kategori, makanya dibikin collection overview
class ShopPage extends React.Component {
    state = {
        loading: true
    }; //this way, React already know that we want to use constructor and super.

    unsubscribeFromSnapshot= null;

    componentDidMount() {
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections'); //ngambil 'collections' collection
        
        collectionRef.onSnapshot(async snapshot => {
           const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
           console.log(collectionsMap);
           updateCollections(collectionsMap);
           this.setState({loading: false})
        })
    }
    

    render() {
        const {match} = this.props
        const {loading} = this.state
        console.log(this.props)
        return (
        <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>} />

        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionsPageWithSpinner isLoading={loading} {...props}/>}/>
            </div>    
        )
    }
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
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);