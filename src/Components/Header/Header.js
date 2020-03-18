import React from 'react';
import './Header.css';

export default props => {
    return (
        <div className='header'>
            <h3>{props.selectedGroup.group_name}</h3>
            <svg onClick={props.toggleFn} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
            </svg>
        </div>
    )
}