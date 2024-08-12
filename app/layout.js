'use client';
import './globals.css'; 
import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';
import SignIn from './api/chat/signin'; 
import { auth, signOut } from './api/chat/firebase'; 
import Head from 'next/head'; 
import { metadata } from './layoutMetadata'; 

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut().then(() => setUser(null));
  };

  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'black', color: 'silver' }}>

        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/usecases" passHref>
                <Button 
                  sx={{ 
                    color: 'silver', 
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#646363' }
                  }}
                >
                  TechPrepBot Usecases
                </Button>
              </Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/waitlist" passHref>
                <Button 
                  sx={{ 
                    color: 'silver', 
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#646363' }
                  }}
                >
                  Join The Waitlist
                </Button>
              </Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              <Link href="/demo" passHref>
                <Button 
                  sx={{ 
                    color: 'silver', 
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#646363' }
                  }}
                >
                  Demo
                </Button>
              </Link>
            </Typography>
            <Box>
              {user ? (
                <Button 
                  sx={{ 
                    color: 'silver', 
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#646363' }
                  }} 
                  onClick={handleSignOut}
                >
                  Logout
                </Button>
              ) : (
                <SignIn user={user} />
              )}
            </Box>
          </Toolbar>
        </AppBar>

        {/* Centered Heading */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '20vh', textAlign: 'center' }}>
          <Typography variant="h3" component="h1" sx={{ color: 'silver' }}>
            TechPrepBot - Your guide to acing technical interviews
          </Typography>
        </Box>

        {/* Main Content Area */}
        <Container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', padding: '20px', alignItems: 'stretch' }}>
          <Box sx={{ width: '100%', color: 'silver' }}>
            {children}
          </Box>
        </Container>

        <footer>
          <Box mt={4} textAlign="center">
            <Typography variant="body1" sx={{ color: 'silver' }}>
              © 2024 Rabia Ghafoor. All rights reserved.
            </Typography>
          </Box>
        </footer>
      </body>
    </html>
  );
}
