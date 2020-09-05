import React from 'react';
import SHOP_DATA from '../../../../shop.data.js';
import ProductsItem from '../products-item.component'


class HatsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: SHOP_DATA,
        }
    }

    render() {
        const hats = this.state.collections[0].items;
        console.log(hats)
        return (
            hats.map(({id, ...props}) => <ProductsItem key={id} {...props} /> )

        )
    }
}

export default HatsPage;
