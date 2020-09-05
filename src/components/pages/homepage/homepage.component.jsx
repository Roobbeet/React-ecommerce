import React from 'react';
import './homepage.styles.scss';
import Directory from '../../directory/directory.component';

const HomePage = (props) => {
    console.log(props)
    return (
    <div className= 'homepage'>
        <Directory />
    </div>
)}
    


export default HomePage;