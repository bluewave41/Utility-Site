import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import SideDrawer from 'components/SideDrawer';
import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const drawerWidth = 240;

export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const [username, setUsername] = useState(props.pageProps.props.username);
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <SideDrawer loggedIn={username ? true : false} drawerWidth={drawerWidth} />
                <Toolbar />
                <Box sx={{ ml: drawerWidth + 20 + 'px' }}>
                    <Component {...pageProps} />
                </Box>
            </ThemeProvider>
        </CacheProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async (context) => {
    const { ctx } = context;
    let props = {};
    if (ctx.req) {
        const { getSession } = await import('../lib/get-session');
        const session = await getSession(ctx.req, ctx.res);
        if(session.user) {
            props.username = session.user.username;
        }
    }

    return {
        pageProps: {
            props: props
        }
    }
}