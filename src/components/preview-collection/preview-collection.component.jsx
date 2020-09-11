import React from 'react';
import { Link } from 'react-router-dom';
import './preview-collection.styles.scss';
import CollectionItem from '../collection-item/collection-item.component'

//component ini berfungsi untuk ngemap isi dari shop data yang tidak secara detail (cuma preview), m,akan
 
const PreviewCollection = ({title, items, routeName }) => {;
    return (
    <div className='collection-preview'>
        <Link to={`shop/${routeName}`} style={{
            textDecoration: 'none',
            color:'black',
        }}>
            <h1 className='title'>{title}</h1></Link>
        <div className='preview'>
            {items
                .filter((item, index) => index < 4)
                .map((item) => (
                    <CollectionItem key={item.id} item={item} />
                ))
            }
        </div>
    </div>

);
}
    

export default PreviewCollection;