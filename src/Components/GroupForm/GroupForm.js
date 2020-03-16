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
                <input value={name} onChange={(e) => setName(e.target.value)}/>
                <br/>
                <input value={description} onChange={(e) => setDescription(e.target.value)}/>
                <br/>
                <input type='checkbox' value={privateGroup} onChange={(e) => setPrivateGroup(e.target.value)}/>
                <button onClick={(e) => createGroup(e)}>Create</button>
                <button>Cancel</button>
            </form>
        </div>
    )
}