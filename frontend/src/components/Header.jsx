import * as React from 'react';
import '@fontsource/roboto';
import {
  AppBar,
  Box,
  Toolbar,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import { isAdminContext, isLoginContext } from '../App';
import { useContext } from 'react';
function HeaderBar () {
  return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        BigBrain
                    </Typography>
                    <LoginButton />
                </Toolbar>
            </AppBar>
        </Box>
  );
}
function LoginButton () {
  const isLogin = useContext(isLoginContext);
  const isAdmin = useContext(isAdminContext);
  if (isAdmin) {
    if (isLogin) {
      return (
                <Button>Logout</Button>
      );
    } else {
      return (
                <Button>Login</Button>
      );
    }
  } else {
    return null;
  }
}
export default HeaderBar;
