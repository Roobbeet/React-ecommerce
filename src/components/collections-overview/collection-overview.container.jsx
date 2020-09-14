//fungsi component: bikin spinner di shop.component jadi bersih (gak ada property isLoading)

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux'

import {selectIsCollectionFetching} from '../../redux/shop/shop.selector';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching,
});

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);
//compose ngubah connect(mapStateToProps)(WithSpinner(CollectionsOverview)) jadi lebih simple

export default CollectionsOverviewContainer;