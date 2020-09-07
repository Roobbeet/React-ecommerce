import React from 'react'
import {connect} from 'react-redux'
import './collection.styles.scss';
import {selectCollection} from '../../../redux/shop/shop.selector'
import ProductsItem from '../../pages/products-page/products-item.component'
import CollectionItem from '../../collection-item/collection-item.component'

const CollectionPage = ({collection}) => {
   const {title, items} = collection
    console.log(collection)
    return (
    <div className="collection-page">
        <h2 className="title">{title}</h2>
        <div className="items">
        {
            items.map(item =>
            <CollectionItem key={item.id} item={item} />)
        }
        </div>
    </div> 
   )
}
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
    //jadi, collection bakal pake function dari selector dengan properti ownprops.match.params.collectionId ---> didapet dari url.
    //asalnya dari state
})

export default connect(mapStateToProps)(CollectionPage);