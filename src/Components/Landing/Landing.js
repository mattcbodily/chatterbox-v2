import React, {useState} from 'react';
import axios from 'axios';
import './Landing.css';

export default props => {
    const [username, setUsername] = useState(''),
          [email, setEmail] = useState(''),
          [password, setPassword] = useState(''),
          [verPassword, setVerPassword] = useState(''),
          [loginView, setLoginView] = useState(true);

    const login = () => {
        axios.post('/api/login', {email, password})
        .then(res => {
            props.userFn(res.data);
        })
        .catch(err => console.log(err));
    }

    const register = () => {
        if(password !== '' && password === verPassword){
            axios.post('/api/register', {username, email, password})
            .then(res => {
                props.userFn(res.data);
            })
            .catch(err => console.log(err));
        } else {
            //add a stylized alert here
            console.log('Passwords do not match')
        }
    }

    return (
        <div className='landing'>
            <h1>Welcome to Chatterbox</h1>
            {loginView
            ? (<>
                <input value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input value={password} placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
                <button onClick={login}>Login</button>
                <p>Don't have an account? <span onClick={() => setLoginView(false)}>Register here</span></p>
               </>)
            : (<>
                <input value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                <input value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                <input value={password} placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)}/>
                <input value={verPassword} placeholder='Verify Password' type='password' onChange={(e) => setVerPassword(e.target.value)} />
                <button onClick={register}>Register</button>
                <p>Have an account? <span onClick={() => setLoginView(true)}>Login here</span></p>
               </>)}
        </div>
    )
}