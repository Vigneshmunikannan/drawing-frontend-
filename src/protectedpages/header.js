import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home, AddCircle, PersonAdd, ShoppingBasket, ExitToApp } from '@mui/icons-material';
import { useAuth } from "../routes/Context";
const Header = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout()
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <IconButton color="inherit" component={Link} to="/home">
          <Home />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/add-order">
          <AddCircle />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/create-user">
          <PersonAdd />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/orders">
          <ShoppingBasket />
        </IconButton>
        <Button color="inherit" startIcon={<ExitToApp />} onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
