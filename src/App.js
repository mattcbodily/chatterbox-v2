import React, {useState} from 'react';
import Landing from './Components/Landing/Landing';
import SideMenu from './Components/SideMenu/SideMenu';
import Message from './Components/Message/Message';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false),
        [user, setUser] = useState({}),
        [selectedGroup, setSelectedGroup] = useState(null);

  const getUser = (data) => {
    setUser(data);
    setLoggedIn(true);
  }

  const selectGroup = (data) => {
    setSelectedGroup(data)
  }

  return (
    <div className="App">
      {loggedIn
      ? (<>
          <SideMenu user={user} selectFn={selectGroup}/>
          <Message user={user} selectedGroup={selectedGroup}/>
         </>)
      : <Landing userFn={getUser}/>}
    </div>
  );
}

export default App;