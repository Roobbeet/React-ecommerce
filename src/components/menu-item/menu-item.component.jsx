import React from 'react';
import './menu-item.styles.scss';
import { withRouter } from 'react-router-dom';
//dibawahnya directory, buat bikin per kategori

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (

    <div className={`${size} menu-item`}  style ={{ //style ngasih object berupa css
        backgroundImage: `url(${imageUrl})` 
        }} onClick={() => history.push(`${match.url}${linkUrl}`)}>
        <div
        className="background-image"
        />
                <div className="content">
                    <h1 className="title">{title}</h1>
                    <span className="subtitle">Shop Now!</span>
                </div>
            </div>


)

export default withRouter(MenuItem);
//karena cuma MenuItem yg butuh history, makanya cuma dia yg dikasih history dengan cara withRouter