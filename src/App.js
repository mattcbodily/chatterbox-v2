import React, {useState} from 'react';
import Landing from './Components/Landing/Landing';
import SideMenu from './Components/SideMenu/SideMenu';
import Message from './Components/Message/Message';
import SettingMenu from './Components/SettingMenu/SettingMenu';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false),
        [settingMenuView, setSettingMenuView] = useState(false),
        [user, setUser] = useState({}),
        [selectedGroup, setSelectedGroup] = useState({});

  const getUser = (data) => {
    setUser(data);
    setLoggedIn(true);
  }

  const selectGroup = (data) => {
    setSelectedGroup(data)
  }

  const toggleSettingMenu = () => {
    setSettingMenuView(!settingMenuView)
  }

  return (
    <div className="App">
      {loggedIn
      ? (<>
          <SideMenu user={user} selectFn={selectGroup}/>
          <Message user={user} selectedGroup={selectedGroup} toggleFn={toggleSettingMenu}/>
          {settingMenuView
                ? <SettingMenu toggleFn={toggleSettingMenu}/>
                : null}
         </>)
      : <Landing userFn={getUser}/>}
    </div>
  );
}

export default App;