import React from 'react';
import SHOP_DATA from '../../../shop.data.js';
import PreviewCollection from '../../preview-collection/preview-collection.component';


class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: SHOP_DATA,
        }
    }
    
    render() {
        const {collections} = this.state;
        
        return (
            <div className="shop-page">
                {
                    collections.map(({id, routeName, ...collectionsProps}) =>
                    <PreviewCollection key={id} routeName={routeName} {...collectionsProps}/>)
                }
            </div>

        )
    }
}

export default ShopPage;