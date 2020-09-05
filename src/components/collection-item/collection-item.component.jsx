import React from 'react';
import {connect} from 'react-redux';
import {addItem} from '../../redux/cart/cart.actions';
import './collection-item.styles.scss';
import CustomButton from '../custom-button/custom-button.component'

//this component is to render particular component

const CollectionItem = ({ item, addItem}) => {
    const { id, name, price, imageUrl} = item; //supaya bisa akses item di addItem
    return (

    <div className='collection-item'>
        <div className="image"
        style ={{
            backgroundImage: `url(${imageUrl})`       
            }}/>
            <div className="collection-footer">
    <span className="name">{ name }</span>
    <span className="name">{ price }</span>
            </div>

<CustomButton onClick={() => addItem(item)} inverted>ADD TO CART</CustomButton>
    </div>
    

)}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})
export default connect(null, mapDispatchToProps)(CollectionItem);