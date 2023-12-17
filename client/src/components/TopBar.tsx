import  { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  Avatar,
  Drawer,
  List,
  ListItemText,
  Box,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { WalletContext } from '../context/WalletContext';
import { formatAddress } from '../utils/formatAddress';

export default function TopBar() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { connectWallet,account } = useContext(WalletContext);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <AppBar color="transparent" position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side - Logo and Name */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Avatar src="/great-ape-psn.png" />
          </IconButton>
          <Typography variant="h6" component="div">
            GreatApe77 Faucets
          </Typography>
        </Box>

        {isMobile ? (
          // If mobile, display hamburger menu on the right
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        ) : (
          // If not mobile, display buttons on the right
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="primary" variant="contained">
              Login
            </Button>
            <Button color="primary" variant="text">
              Register
            </Button>
            <Button onClick={connectWallet} color="info" variant="outlined">
              <Avatar src="/MetaMask_Fox.svg" />
              {account ? formatAddress(account) : 'Connect Wallet'}
            </Button>
          </Box>
        )}

        {/* Drawer for mobile */}
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
          <List>
            <ListItemButton  onClick={handleDrawerClose}>
              <ListItemText primary="Login" />
            </ListItemButton>
            <ListItemButton onClick={handleDrawerClose}>
              <ListItemText primary="Register" />
            </ListItemButton>
            <ListItemButton  onClick={handleDrawerClose}>
              <ListItemText primary="Connect Wallet" />
            </ListItemButton>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
