import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Link from 'next/link';

const Tabs = (props) => {
    const tabs = [
        { text: 'Login', url: '/login', icon: <LoginIcon /> },
        { text: 'Register', url: '/register', icon: <AppRegistrationIcon /> },
    ]

    return (
        <List>
        {tabs.map(el => (
            <Link href={el.url}>
                <ListItem button key={el.text}>
                    <ListItemIcon>
                        {el.icon}
                    </ListItemIcon>
                    <ListItemText primary={el.text} />
                </ListItem>
            </Link>
        ))}
    </List>

    )
}

export default Tabs;