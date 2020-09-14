import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux'

import {selectIsCollectionsLoaded} from '../../../redux/shop/shop.selector';
import WithSpinner from '../../with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !selectIsCollectionsLoaded(state), //karena mau nilai sebaliknya (true/false)
})

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionPageContainer;

//cara kerja container adalah ngepass props ke component lain dengan compose dan mapStateToProps