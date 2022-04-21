import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({
        color: 'red',
        message: ''
    });

    const onChange = (e) => {
        switch(e.target.name) {
            case 'username':
                setUsername(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
        }
    }

    const onSubmit = async (e) => {
        let response;
        try {
            response = await axios.post('/api/auth/login', { username: username, password: password });
            setMessage({
                color: 'green',
                message: 'Logged in.'
            });
        }
        catch(e) {
            setMessage({
                color: 'red',
                message: e.response.data.message
            });
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', minHeight: '100vh' }}>
            <Box sx={{ width: '30%', display: 'flex', flexDirection: 'column', margin: 'auto' }}>
                <h1>Login</h1>
                <TextField onChange={onChange} name='username' />
                <TextField onChange={onChange} name='password' />
                <Box sx={{ color: message.color }}>{message.message}</Box>
                <Button variant='contained' onClick={onSubmit}>Submit</Button>
            </Box>
        </Box>
    )
}

export default Login;