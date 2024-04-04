import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { useAuth } from "../routes/Context";
function Admin() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleLogin = async () => {
    if (username === "" || password === "") {
      setResponse("Enter both username and password");
      setTimeout(() => {
        setResponse("");
      }
        , 2000)
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/login`, {
        username,
        password
      });
      login(response.data.token)
      setResponse("Login success");
      setTimeout(() => {
        setResponse("");
      }
        , 2000)

    } catch (error) {
      setResponse(error.response.data);
      setTimeout(() => {
        setResponse("");
      }
        , 2000)

    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          {response && (
            <Typography color="error" align="center" style={{ marginTop: '20px' }}>
              {response}
            </Typography>
          )}

          <Button variant="contained" color="primary" fullWidth onClick={handleLogin} style={{ marginTop: '20px' }}>
            Login
          </Button>

        </Paper>
      </Grid>
    </Grid>
  );
}

export default Admin;
