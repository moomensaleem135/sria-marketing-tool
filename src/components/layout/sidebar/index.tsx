'use client';
import styled from '@emotion/styled';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Menu, MenuProps, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';

import * as React from 'react';
import { useEffect, useState } from 'react';

import logo from '../../../../public/svgs/lpcLogo.svg';
import MiniLogo from '../../../../public/svgs/lpcMiniLogo.svg';
import { COLORS } from '../../../constants/colors';
import NavBar from '../navbar';
import {
  DrawerHeader,
  MainStyle,
  AppBarStyle,
  DIV,
  ListItemTextStyledActive,
  CollapseArrowBox,
  IconSpan,
  StyledDrawer,
  SidebarStyledListItem
} from './index.styles';
import { MenuITEMS } from './menu';
import { useRouter } from 'nextjs-toploader/app';
import CustomModal from '@/components/core/Modal';
import ButtonWitnLoading from '@/components/core/ButtonWithLoading';
import { setFiles } from '@/store/app/appSlice';

interface Props {
  children: React.ReactNode;
  pageTitle: string;
}
export const HIDDEN_ROUTES_LEFT_DRAWER = ['/', '/login', '/profile', '/support'];

export default function LeftDrawer({ children, pageTitle }: Props) {
  const router = useRouter();

  const isTablet = useMediaQuery('(max-width: 960px)');
  const [openD, setOpenD] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [pushedRoute, setPushedRoute] = useState<string>('');

  const [openMenu, setOpenMenu] = useState<string | null>('');
  const [saveAlert, setSaveAlert] = useState<boolean>(false);
  const handleDrawerOpen = () => {
    setOpenD(true);
    setCollapse(true);
  };
  const handleDrawerClose = () => {
    setCollapse(false);
  };
  const handleCloseConfirmRoute = () => {
    setSaveAlert(false);
  };

  useEffect(() => {
    setCollapse(isTablet);
  }, [isTablet]);

  const drawerWidth = collapse ? 80 : 330;

  const path = usePathname();
  const handleClickMenu = (event: React.MouseEvent<HTMLElement>, menu: string) => {
    if (openMenu === menu) {
      // If the menu is already open, close it
      setAnchorEl(null);
      setOpenMenu(null);
    } else {
      // Otherwise, open the clicked menu
      setAnchorEl(event.currentTarget);
      setOpenMenu(menu);
    }
  };
  const handleClickMenuIcon = (event: React.MouseEvent<HTMLElement>, menu: string) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(menu);
  };
  const { taskId } = useParams();
  const handleRoutePush = (route: string) => {
    if (path === '/reports' || path === '/') {
      router.push(route);
      setFiles([]);
    } else {
      const isSaved = localStorage.getItem('isSaved');
      setSaveAlert(true);
    }
  };
  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      minWidth: 180,
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0'
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18
        }
      }
    }
  }));
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogoClick = () => {
    router.push('/');
  };
  // const isHiddenRoute = HIDDEN_ROUTES_LEFT_DRAWER.find((route) => route === path);
  const isHiddenRoute = false;
  const handleLeaveConfirmClick = () => {
    setFiles([]);
    setSaveAlert(false);
    router.push(pushedRoute);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <AppBarStyle
          position={
            path === '/activities/tasks' || path === `/activities/tasks/${taskId}`
              ? 'absolute'
              : 'fixed'
          }
          open={!isHiddenRoute}
          drawerwidth={isHiddenRoute ? 0 : drawerWidth}
          sx={{ boxShadow: 'none !important' }}
        >
          <NavBar />
        </AppBarStyle>
      </Box>
      {/* // this will hide the left drawer for these routes */}
      {/* {!isHiddenRoute && ( */}
      <StyledDrawer
        variant="permanent"
        open={openD}
        sx={{
          width: drawerWidth,

          '& .MuiDrawer-paper': {
            width: drawerWidth
          }
        }}
      >
        <CollapseArrowBox sx={{ top: collapse ? '5px' : '10px' }}>
          {collapse ? (
            <IconSpan onClick={handleDrawerClose}>
              <ChevronRightIcon />
            </IconSpan>
          ) : (
            <IconSpan onClick={handleDrawerOpen}>
              <ChevronLeftIcon />
            </IconSpan>
          )}
        </CollapseArrowBox>
        <DrawerHeader>
          <Box sx={{ cursor: 'pointer' }} onClick={handleLogoClick}>
            {collapse ? (
              <Image src={MiniLogo} height={50} width={50} alt="" />
            ) : (
              <Image src={logo} height={180} width={200} alt="logo" />
            )}
          </Box>
        </DrawerHeader>
        <Divider
          sx={
            collapse
              ? { width: '4rem', marginInline: 'auto' }
              : { width: '12rem', marginInline: 'auto' }
          }
        />
        <DIV>
          <List
            sx={{
              padding: 0,
              overflowX: 'hidden'
            }}
          >
            {MenuITEMS.map((item) => (
              <>
                {item.isLineAbove === 'true' && (
                  <hr style={{ height: '2px', background: `${COLORS.GREY_400} !important` }} />
                )}
                <SidebarStyledListItem key={item.title}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      background: path.includes(item.path)
                        ? `${COLORS.BLUE_THEME_MAIN}`
                        : 'transparent',
                      '&:hover': {
                        background: path.includes(item.path) ? '#184063' : `${COLORS.GREY_200}`,
                        color: path.includes(item.path) ? `${COLORS.GREY_200}` : `#184063`
                      },
                      borderRadius: '10px',
                      display: 'flex'
                    }}
                    disabled={item.path === '/resources'}
                    onClick={(e) => {
                      setPushedRoute(item.path);
                      handleRoutePush(item.path);
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        mr: collapse ? 0 : 3,
                        ml: collapse ? -1 : 0,
                        alignItems: 'center',
                        minWidth: '0 !important',
                        fill: path.includes(item.path) ? 'white' : `black`
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!collapse &&
                      (path === item.path || path.includes(item.path) ? (
                        <ListItemTextStyledActive sx={{ color: 'white', fontWeight: '500' }}>
                          {item.title}
                        </ListItemTextStyledActive>
                      ) : (
                        <Typography>{item.title}</Typography>
                      ))}
                  </ListItemButton>
                </SidebarStyledListItem>
                {/* )} */}
              </>
            ))}
          </List>
        </DIV>
      </StyledDrawer>
      {/* // )} */}

      <MainStyle
        // open={isHiddenRoute ? false : true}
        // drawerwidth={isHiddenRoute ? 15 : drawerWidth}
        // style={{ padding: isHiddenRoute ? '0 15%' : '0 0' }}
        open={true}
        drawerwidth={drawerWidth}
        style={{ padding: '0 0' }}
      >
        {children}
      </MainStyle>
      <CustomModal
        openValue={saveAlert}
        closeFunction={() => setSaveAlert(false)}
        // mainHeading="Delete File?"
        closedIcon={true}
        modalWidth={'25rem'}
      >
        <Box>
          <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Leaving Page?
          </Typography>
          <Typography sx={{ fontSize: '0.9rem', fontWeight: 400 }}>
            Changes you made may not be saved.
          </Typography>
          <Box
            sx={{ display: 'flex', justifyContent: 'end', columnGap: '1rem', marginTop: '1rem' }}
          >
            <ButtonWitnLoading
              text="Close"
              bg="black"
              textColor="white"
              handleClick={handleCloseConfirmRoute}
            />
            <ButtonWitnLoading text="Confirm" handleClick={handleLeaveConfirmClick} />
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
}
