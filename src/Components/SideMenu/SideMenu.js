import React, {useState} from 'react';
import './SideMenu.css';

export default props => {
    const [chatSearch, setChatSearch] = useState('');

    return (
        <div className='side-menu'>
            <div className='search-flex'>
                <input className='search-bar' value={chatSearch}/>
                <button className='create-group-btn'>+</button>
            </div>
        </div>
    )
}