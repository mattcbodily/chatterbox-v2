import React, {useState} from 'react';
import Landing from './Components/Landing/Landing';
import SideMenu from './Components/SideMenu/SideMenu';
import Message from './Components/Message/Message';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState({});

  const getUser = (data) => {
    setUser(data);
    setLoggedIn(true);
  }

  return (
    <div className="App">
      {loggedIn
      ? (<>
          <SideMenu user={user}/>
          <Message user={user}/>
         </>)
      : <Landing userFn={getUser}/>}
    </div>
  );
}

export default App;