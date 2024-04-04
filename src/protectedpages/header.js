import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home, AddCircle, PersonAdd, ShoppingBasket, ExitToApp, Edit } from '@mui/icons-material'; // Import the Edit icon
import { useAuth } from "../routes/Context";

const Header = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Pixel Perfect
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
        <IconButton color="inherit" component={Link} to="/edit-user"> {/* Add/Edit User route */}
          <Edit />
        </IconButton>
        <Button color="inherit" startIcon={<ExitToApp />} onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
