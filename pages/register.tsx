import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';

const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            response = await axios.post('/api/auth/register', { username: username, password: password });
        }
        catch(e) {

        }
    }

    return (
        <Box sx={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
            <h1>Register</h1>
            <TextField onChange={onChange} />
            <TextField onChange={onChange} />
            <Button variant='contained' onClick={onSubmit}>Submit</Button>
        </Box>
    )
}

export default Register;