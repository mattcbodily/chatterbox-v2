import React, {useState} from 'react';
import axios from 'axios';
import './GroupForm.css';

export default props => {
    const [name, setName] = useState(''),
          [description, setDescription] = useState(''),
          [privateGroup, setPrivateGroup] = useState(false);

    const createGroup = (event) => {
        event.preventDefault();

        let newGroup = {
            id: props.user.user_id,
            name,
            description,
            privateGroup
        }

        axios.post('/api/groups', newGroup)
        .then(() => {
            //get groups here
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='group-form-opacity'>
            <form class='group-form'>
                <h1>Create a group</h1>
                <label>Group Name</label>
                <br/>
                <input className='group-form-input' value={name} onChange={(e) => setName(e.target.value)}/>
                <br/>
                <label>What's this group about?</label>
                <br/>
                <input className='group-form-input' value={description} onChange={(e) => setDescription(e.target.value)}/>
                <br/>
                <label>
                    <input type='checkbox' value={privateGroup} onChange={(e) => setPrivateGroup(e.target.value)}/>
                    Private Group
                </label>
                <button onClick={(e) => createGroup(e)}>Create</button>
                <button onClick={(e) => props.toggleFn(e)}>Cancel</button>
            </form>
        </div>
    )
}