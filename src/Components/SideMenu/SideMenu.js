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
    }, [props.user.user_id])

    const handleToggle = (event) => {
        event.preventDefault()
        setFormView(false)
    }

    let mappedGroups = groups.map((group, i) => (
        <div key={i} className='side-menu-group' onClick={() => props.selectFn(group.group_id)}>
            <img src={group.group_image} alt={group.group_name} className='side-menu-group-image'/>
            <section>
                <p className='side-menu-group-name'>{group.group_name}</p>
                <p className='side-menu-last-sender'>persons name</p>
                <p className='side-menu-message'>leedleleedlelee</p>
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
                {formView ? <GroupForm user={props.user} toggleFn={handleToggle}/> : null}
        </div>
    )
}