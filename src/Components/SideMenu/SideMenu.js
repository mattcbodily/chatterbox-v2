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
            props.selectFn(res.data[0])
        })
        .catch(err => console.log(err))
    }, [props])

    const getGroups = () => {
        axios.get(`/api/groups/${props.user.user_id}`)
        .then(res => {
            setGroups(res.data)
        })
        .catch(err => console.log(err))
    }

    const handleToggle = (event) => {
        event.preventDefault()
        setFormView(false)
    }

    return (
        <div className='side-menu'>
            <div className='search-flex'>
                <input className='search-bar' value={chatSearch} onChange={(e) => setChatSearch(e.target.value)}/>
                <button className='create-group-btn' onClick={() => setFormView(true)}>+</button>
            </div>
            {groups.map((group, i) => (
                <div key={i} className='side-menu-group' onClick={() => props.selectFn(group)}>
                <img src={group.group_image} alt={group.group_name} className='side-menu-group-image'/>
                <section>
                    <p className='side-menu-group-name'>{group.group_name}</p>
                    <p className='side-menu-last-sender'>persons name</p>
                    <p className='side-menu-message'>leedleleedlelee</p>
                </section>
                </div>
            ))}
            {formView ? <GroupForm user={props.user} toggleFn={handleToggle} groupsFn={getGroups}/> : null}
        </div>
    )
}