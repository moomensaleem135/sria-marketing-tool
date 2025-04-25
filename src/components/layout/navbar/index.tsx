import { COLORS } from '@/constants/colors';
import { Logout, LogoutSharp } from '@mui/icons-material';
import { Box, IconButton, Menu, Typography } from '@mui/material';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';

import {
  IconsDiv,
  LogoDiv,
  MainContainer,
  NavBarMain,
  StyledProfileDropDownItem,
  UserNameText
} from './index.styles';

const NavBar = () => {
  const [loggedUser, setLoggedUser] = useState('user');
  const router = useRouter();
  const path = usePathname();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('isAuthenticated');
    // window.location.href = '/login';
  };
  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      const user = JSON.parse(localUser);
      setLoggedUser(user.username);
    }
  });

  return (
    <MainContainer
      style={{
        padding: '1rem 2rem 0rem 2rem'
      }}
    >
      <NavBarMain>
        <LogoDiv>
          {/* {!HIDDEN_ROUTES_LEFT_DRAWER.find((route) => route === path) ? ( */}
          <Box>
            <UserNameText>
              {' '}
              Hey, Lauren
              {/* {loggedUser ? loggedUser.split(/[\s\-,]/)[0] : 'Lauren'} */}
            </UserNameText>
            <Typography>Welcome Back!</Typography>
          </Box>
        </LogoDiv>
        <IconsDiv>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Image src="/svgs/account.svg" width={36} height={36} alt="" />
          </IconButton>
        </IconsDiv>
      </NavBarMain>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <StyledProfileDropDownItem
          onClick={() => router.push('/#')}
          sx={{
            color: path.includes('/profile') ? COLORS.BLUE_600 : 'black',
            fontWeight: path.includes('/profile') ? 'bold' : 'normal'
          }}
        >
          <Image src={'/svgs/helpIcon.svg'} height={20} width={20} alt="profile" />
          Help
        </StyledProfileDropDownItem>
        <StyledProfileDropDownItem onClick={handleLogout}>
          <Logout fontSize="small" />
          Logout
        </StyledProfileDropDownItem>
      </Menu>
    </MainContainer>
  );
};

export default NavBar;
