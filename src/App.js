import React, {useState} from 'react';
import Landing from './Components/Landing/Landing';
import SideMenu from './Components/SideMenu/SideMenu';
import Message from './Components/Message/Message';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {loggedIn
      ? (<>
          <SideMenu />
          <Message />
         </>)
      : <Landing />}
    </div>
  );
}

export default App;