import React from 'react';
import {connect} from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import {selectCartItemsCount} from '../../redux/cart/cart.selectors'

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon  className='shopping-icon'/>
        <span className="item-count">{itemCount}</span>
    </div>
)

const mapDispatchToProps = dispatch => ({ //jadi function ini gunanya buat ngedispatch function toggleCartHidden ke toggleCartHidden di dalem CartIcon
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = state => ({
    itemCount: selectCartItemsCount(state)
    //reduce((accumulator, currentEl) => function), accumulatorFirstNumber)
    //accumulator bakal direturn dan dipake buat array element selanjutnya
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

