import React, {useState} from 'react';
import './SideMenu.css';

export default props => {
    const [chatSearch, setChatSearch] = useState('');

    return (
        <div className='side-menu'>
            <input value={chatSearch}/>
            <button>+</button>
        </div>
    )
}