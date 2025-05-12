import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { Box, Typography, Link as MuiLink, Menu, MenuItem } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import useUser from '../hooks/useUser';
const useStyles = styled('div')(({ theme }) => ({
  title: {
    flexGrow: 1,
  },
  navItem: {
    marginLeft: '3rem'
  }
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logout } = useUser();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    logout();
    setAnchorEl(null);
  };
  const { user } = useUser();
  return (
    <AppBar position="static">
      <Toolbar>
        <Box width="100px" p={1} mr={3}>
          <img src={"https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"} alt={'logo'} />
        </Box>
        <Box sx={{ flexGrow: 1 }} display="flex">
          <Box mr={5}>
            <Typography variant="h5" >
              <MuiLink color="inherit" underline="none" to="/" component={Link}>HOME</MuiLink>
            </Typography>
          </Box>
          <Box mr={5}>
            <Typography variant="h5" >
              <MuiLink color="inherit" underline="none" to="/favorite" component={Link}>FAVORITE</MuiLink>
            </Typography>
          </Box>
          <Typography variant="h5" >
            <MuiLink color="inherit" underline="none" to="/rated" component={Link}>RATED</MuiLink>
          </Typography>
        </Box>
        <Typography variant="h6" >
          {user
            ? (
              <>
                <Box onClick={handleClick}>{user.username}</Box>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>)
            : <MuiLink color="inherit" underline="none" to="/login" component={Link}>{"Login"}</MuiLink>}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
