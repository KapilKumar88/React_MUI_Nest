import Box from '@mui/material/Box';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';

export default function DefaultLayout() {
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar handleDrawerOpen={handleDrawerOpen} open={open}></Navbar>
            <Sidebar handleDrawerClose={handleDrawerClose} open={open}></Sidebar>
            <Outlet />
        </Box>
    )
}
