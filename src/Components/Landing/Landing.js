import React, {useState} from 'react';
import axios from 'axios';

export default props => {
    const [username, setUsername] = useState(''),
          [email, setEmail] = useState(''),
          [password, setPassword] = useState(''),
          [verPassword, setVerPassword] = useState(''),
          [loginView, setLoginView] = useState(true);

    return (
        <div>
            {loginView
            ? (<>
                <input />
                <input />
                <button>Login</button>
                <p>Don't have an account? <span onClick={() => setLoginView(false)}>Register here</span></p>
               </>)
            : (<>
                <input />
                <input />
                <input />
                <input />
                <button>Register</button>
                <p>Have an account? <span onClick={() => setLoginView(true)}>Login here</span></p>
               </>)}
        </div>
    )
}