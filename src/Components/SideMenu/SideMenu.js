import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GroupForm from '../GroupForm/GroupForm';
import './SideMenu.css';

export default props => {
    const [groups, setGroups] = useState([]),
          [chatSearch, setChatSearch] = useState(''),
          [formView, setFormView] = useState(false);

    useEffect(() => {
        axios.get(`/api/groups/${props.user.user_id}`)
        .then(res => {
            setGroups(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    let mappedGroups = groups.map((group, i) => (
        <div key={i} className='side-menu-group'>
            <img src={group.group_image} alt={group.group_name} className='group-image'/>
            <section>
                <p>{group.group_name}</p>
                <p>leedleleedlelee</p>
            </section>
        </div>
    ))

    return (
        <div className='side-menu'>
            <div className='search-flex'>
                <input className='search-bar' value={chatSearch} onChange={(e) => setChatSearch(e.target.value)}/>
                <button className='create-group-btn' onClick={() => setFormView(true)}>+</button>
            </div>
                {mappedGroups}
                {formView ? <GroupForm user={props.user}/> : null}
        </div>
    )
}