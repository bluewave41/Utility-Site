import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';

const CreateLink = (props) => {
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState({
        color: 'red',
        message: ''
    });

    const onChange = (e) => {
        setUrl(e.target.value);
    }

    const onSubmit = async () => {
        let response;
        try {
            response = await axios.post('/api/links/create', { url: url });
            setMessage({
                color: 'black',
                message: `Link created. Your shortened link is http://www.localhost:3000/${response.data.link}`
            })
        }
        catch(e) {
            setMessage({
                color: 'red',
                message: e.response.data.message
            });
        }
    }

    return (
        <Box>
            <h1>Create a shortened link</h1>
            <TextField onChange={onChange} />
            <Button variant='contained' sx={{ height: '55px' }} onClick={onSubmit}>Create</Button>
            <Box sx={{ color: message.color }}>{message.message}</Box>
        </Box>
    )
}

export default CreateLink;