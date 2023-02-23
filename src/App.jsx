import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Home } from './Home'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import { AddUser } from './AddUser';
import { UserList } from './UserList';
import { UserDetails } from './UserDetails';
import {PageNotFound} from './PageNotFound'
import { EditUser } from './EditUser';

function App() {
  const navigate = useNavigate();

  
  const bgstyle = {
    borderRadius: "0px",
    minHeight:"100vh",
  }
  const [show, setshow] = useState(true)
  const darkTheme = createTheme({
    palette: {
      mode: show ? 'dark':'light',
    },
  });


  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={4} sx={bgstyle} >
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" onClick={()=>navigate("/")} >Home</Button>
              <Button color="inherit" onClick={()=>navigate("/user")} >User</Button>
              <Button color="inherit" onClick={() => navigate("/user/add")} >Add User</Button>
              <Button sx={{marginLeft:"auto"}} color="inherit" onClick={() => setshow(!show)} >{show ? <BrightnessHighIcon/> : <Brightness4Icon/> }{ show ? 'Light Mode' : 'Drak Mode'}</Button>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/user/add" element={<AddUser />} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/user/edit/:id" element={<EditUser />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Paper>
    </ThemeProvider>
  )
}

export default App


