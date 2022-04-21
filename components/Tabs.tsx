import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Link from 'next/link';
import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';

const Tabs = (props) => {
    const loggedOutTabs = [
        { text: 'Login', url: '/login', icon: <LoginIcon /> },
        { text: 'Register', url: '/register', icon: <AppRegistrationIcon /> },
    ]

    const loggedInTabs = [
        { text: 'Home', url: '/', icon: <HomeIcon /> },
        { text: 'Create Link', url: '/links/create', icon: <CreateIcon /> },
        { text: 'Logout', url: '/api/auth/logout', icon: <LogoutIcon /> }
    ]

    const tabs = props.loggedIn ? loggedInTabs : loggedOutTabs;

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