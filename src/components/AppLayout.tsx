'use client';

import { app } from '@/constants/firebase';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import { Badge, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { getAuth } from 'firebase/auth';
import React, { ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import  {NavBar} from './NavBar';

export function AppLayout({ children }: { children: ReactNode }) {
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  if(!user) return null

  return (
    <Box className="flex flex-row w-full h-full overflow-clip">
      <CssBaseline />
      <Box
        component="nav"
        className="w-2/12 md:w-1/5 lg:w-2/12 h-full"
        aria-label="mailbox folders"
      >
        <NavBar />
      </Box>
      <Box component="main" className="w-10/12 md:w-4/5 lg:w-10/12 overflow-auto">
        <Box className="md:h-16 w-full sticky shadow-sm z-10 bg-transparent bg-white top-0 flex items-center px-4 py-2">
          <Typography className="inline-flex ml-2 text-lg font-bold text-gray-900">
            Tasks
          </Typography>
          <div className="flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-md mx-2 md:mx-20 focus-within:text-gray-600 focus-within:shadow-md">
            <SearchIcon />
            <input
              type="text"
              name="search-value"
              id="search-value"
              className="flex-grow text-base px-5 bg-transparent outline-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <IconButton className="hidden md:inline-flex">
              <NotificationsNoneIcon
                fontSize="medium"
                className="text-gray-600"
              />
              <Badge
                color="secondary"
                variant="dot"
                className="m-1 md:mt-0 text-xl md:text-lg xl:text-xl"
              ></Badge>
            </IconButton>
          </div>
        </Box>
        {children}
      </Box>
    </Box>
  );
}