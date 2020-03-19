import React from 'react';
import './SettingMenu.css';

export default props => (
    <div className='setting-menu'>
        <p>Profile</p>
        <p>Theme</p>
        <p onClick={props.logoutFn}>Logout</p>
    </div>
)