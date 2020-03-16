import React, {useState} from 'react';
import './GroupForm.css';

export default props => {
    const [groupName, setGroupName] = useState(''),
          [groupDescription, setGroupDescription] = useState(''),
          [privateGroup, setPrivateGroup] = useState(false);

    return (
        <div className='group-form'>
            <input value={groupName} onChange={(e) => setGroupName(e.target.value)}/>
            <input value={groupDescription} onChange={(e) => setGroupDescription(e.target.value)}/>
            <input type='checkbox' value={privateGroup} onChange={(e) => setPrivateGroup(e.target.value)}/>
            <button>Create</button>
        </div>
    )
}