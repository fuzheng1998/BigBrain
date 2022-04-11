import * as React from 'react';
import '@fontsource/roboto';
import {
  AppBar,
  Box,
  Toolbar,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
function HeaderBar () {
  return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        BigBrain
                    </Typography>
                        <div>
                            <Button color="inherit">Logout</Button>
                        </div>
                </Toolbar>
            </AppBar>
        </Box>
  );
}
export default HeaderBar;
