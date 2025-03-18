'use client';
// import { modalStyle } from '@/constants/variables';
import logo from '@/assets/images/svgs/icons/lpcLogo.svg';
import MiniLogo from '@/assets/images/svgs/icons/lpcMiniLogo.svg';
import helpIcon from '@/assets/images/svgs/icons/helpIcon.svg';
import logoutIcon from '@/assets/images/svgs/icons/logoutIcon.svg';

import styled from '@emotion/styled';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Collapse,
  Menu,
  MenuItem,
  MenuProps,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';
import { COLORS } from '../../../constants/colors';
import NavBar from '../navbar';
import {
  DrawerHeader,
  MainStyle,
  AppBarStyle,
  DIV,
  ListItemTextStyledActive,
  CustomListItemText,
  ListItemTextSubMenuStyledActive,
  ListItemTextSubMenuStyledInActive,
  StyledListItemButton,
  CollapseArrowBox,
  IconSpan,
  SideBarNavList,
  StyledDrawer,
  SidebarStyledListItem,
  DrawerFooterMainBox,
  DrawerFooterSubBox,
  HelpTypo,
  LogputTypo
} from './index.styles';
import { MenuITEMS } from './menu';

interface Props {
  children: React.ReactNode;
  pageTitle: string;
}

export default function LeftDrawer({ children, pageTitle }: Props) {
  const router = useRouter();

  const isTablet = useMediaQuery('(max-width: 960px)');
  const [openD, setOpenD] = React.useState(false);
  const [collapse, setCollapse] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [pushedRoute, setPushedRoute] = React.useState<string>('');

  const [openMenu, setOpenMenu] = React.useState<string | null>('');
  const [open1, setOpen] = React.useState<boolean>(true);

  const [saveAlert, setSaveAlert] = React.useState(false);
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

  const drawerWidth = collapse ? 80 : 300;

  const path = usePathname();
  const handleClickMenu = (event: React.MouseEvent<HTMLElement>, menu: string) => {
    console.log('event', event, 'menu', menu);
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
  // const { taskId } = useParams();
  // const handleRoutePush = (route: string) => {
  //   if (path === '/activities/tasks' || path === `/activities/tasks/${taskId}`) {
  //     const isSaved = localStorage.getItem('isSaved');

  //     setSaveAlert(true);
  //   } else {
  //     router.push(route);
  //   }
  // };
  const handleRoutePush = (route: string) => {
    router.push(route);
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
  ))(() => ({
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

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogoClick = () => {
    router.push('/home');
  };

  const handleCloseMenu = () => {
    setOpen(!open1);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarStyle
        position="fixed"
        open={true}
        drawerwidth={drawerWidth}
        sx={{ boxShadow: 'none !important' }}
      >
        <NavBar />
      </AppBarStyle>
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
        <CollapseArrowBox sx={{ left: collapse ? ' 4.2rem' : '18rem' }}>
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
            {collapse ? <Image src={MiniLogo} alt="" height={50} /> : <Image src={logo} alt="" />}
          </Box>
        </DrawerHeader>
        <Divider
          sx={
            collapse
              ? { width: '4rem', marginInline: 'auto' }
              : { width: '16rem', marginInline: 'auto' }
          }
        />
        <DIV>
          <List
            sx={{
              padding: 0,
              overflowX: 'hidden',
            }}
          >
            {MenuITEMS.map((item: any) => (
              <>
                {item && item.submenu && item?.submenu?.length > 0 ? (
                  <SideBarNavList aria-labelledby="nested-list-subheader">
                    {collapse ? (
                      <StyledListItemButton
                        onClick={(e) => {
                          //  setAnchorEl(e.currentTarget); // Set the clicked button as the anchor element
                          handleClickMenuIcon(e, item.title); // Toggle the submenu
                        }}
                        path={path}
                        itemPath={item.path}
                        //  id="demo-customized-button"
                        //  aria-controls={open ? 'demo-customized-menu' : undefined}
                        //  aria-haspopup="true"
                        //  aria-expanded={open ? 'true' : undefined}
                        sx={{ ml: collapse ? -1 : 0 }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ListItemIcon sx={{ minWidth: '0', marginRight: '15px' }}>
                            {item.icon}
                          </ListItemIcon>
                        </Box>
                      </StyledListItemButton>
                    ) : (
                      <StyledListItemButton
                        onClick={(e) => {
                          handleClickMenu(e, item.title);
                          handleCloseMenu();
                        }}
                        path={path}
                        itemPath={item.path}
                        sx={{
                          minHeight: '48px'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ListItemIcon
                            sx={{
                              minWidth: '0',
                              marginRight: '15px'
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>

                          {path.includes(item.path) ? (
                            <CustomListItemText>{item.title}</CustomListItemText>
                          ) : (
                            <Typography>{item.title}</Typography>
                          )}
                        </Box>

                        {openMenu === item.title ? <ExpandLess /> : <ExpandMore />}
                      </StyledListItemButton>
                    )}

                    {collapse ? (
                      //submenu when collapse
                      <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                          'aria-labelledby': 'demo-customized-button'
                        }}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && openMenu === item.title}
                        onClose={handleClose}
                      >
                        {item.submenu.map((ele: any, index: number) => (
                          <MenuItem
                            sx={{
                              background: path === ele.path ? `${COLORS.BLUE_600}` : 'white',
                              borderRadius: '8px',
                              margin: '0.3rem',
                              '&:hover': {
                                background: path === ele.path ? `${COLORS.BLUE_600}` : `white`,
                                color: path === ele.path ? `${COLORS.BLUE_600}` : `#184063`
                              }
                            }}
                            key={index}
                            onClick={() => {
                              setPushedRoute(ele.path);
                              handleRoutePush(ele.path);
                              handleClose();
                            }}
                          >
                            {path === ele.path || path.includes(ele.path) ? (
                              <ListItemTextSubMenuStyledActive primary={ele.title} />
                            ) : (
                              <ListItemTextSubMenuStyledInActive primary={ele.title} />
                            )}
                          </MenuItem>
                        ))}
                      </StyledMenu>
                    ) : (
                      //this is submenu item without collapsable
                      <Collapse
                        // in={openMenu === item.title}
                        in={true}
                        timeout="auto"
                        unmountOnExit
                        orientation="vertical"
                      >
                        <Box style={{ marginTop: '10px' }}>
                          {item.submenu.map((ele: any, index: number) => {
                            return (
                              <List
                                component="div"
                                key={index}
                                disablePadding
                                onClick={() => {
                                  setPushedRoute(ele.path);
                                  handleRoutePush(ele.path);
                                }}
                                style={{
                                  // borderLeft: '1px dashed white',
                                  marginLeft: '18px',
                                  paddingLeft: '23px',
                                  borderRadius: '8px',
                                  background:
                                    path === ele.path || path.includes(ele.path)
                                      ? `
                                  ${COLORS.BLUE_600}
                                  `
                                      : 'transparent'
                                }}
                              >
                                <ListItemButton sx={{ pl: 2, borderRadius: '5px' }}>
                                  {path === ele.path || path.includes(ele.path) ? (
                                    <ListItemTextSubMenuStyledActive primary={ele.title} />
                                  ) : (
                                    <ListItemTextSubMenuStyledInActive primary={ele.title} />
                                  )}
                                </ListItemButton>
                              </List>
                            );
                          })}
                        </Box>
                      </Collapse>
                    )}
                  </SideBarNavList>
                ) : (
                  <SidebarStyledListItem key={item.title}>
                    {/* collapsable menu icon */}
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        background:
                          path === item.path || path.includes(item.path)
                            ? `
                            ${COLORS.BLUE_600}
                            `
                            : 'transparent',
                        '&:hover': {
                          background:
                            path === item.path || path.includes(item.path)
                              ? `${COLORS.BLUE_600}`
                              : `white`,
                          color: path === item.path ? `${COLORS.BLUE_600}` : `#184063`
                        },
                        borderRadius: '10px',
                        display: 'flex'
                      }}
                      onClick={() => {
                        setPushedRoute(item.path);
                        handleRoutePush(item.path);
                      }}
                    >
                      <Tooltip
                        title={collapse && item.title}
                        placement="right"
                        arrow
                        componentsProps={{
                          tooltip: {
                            sx: {
                              backgroundColor: `${COLORS.BLUE_600}`,
                              color: 'white',
                              fontSize: '0.8rem',
                              padding: '10px',
                              marginLeft: '1.6rem !important'
                            }
                          },
                          arrow: {
                            sx: {
                              color: `${COLORS.BLUE_600}`
                            }
                          }
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            mr: collapse ? 0 : 3,
                            ml: collapse ? -1 : 0,
                            alignItems: 'center',
                            minWidth: '0 !important',
                            fill: path === item.path || path.includes(item.path) ? 'white' : 'black'
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                      </Tooltip>
                      {!collapse &&
                        (path === item.path || path.includes(item.path) ? (
                          <ListItemTextStyledActive
                            sx={{
                              color: 'white',
                              fontWeight: '500'
                            }}
                          >
                            {item.title}
                          </ListItemTextStyledActive>
                        ) : (
                          <Typography>{item.title}</Typography>
                        ))}
                    </ListItemButton>
                  </SidebarStyledListItem>
                )}
              </>
            ))}
          </List>
        </DIV>
        <DrawerFooterMainBox sx={{ paddingLeft: collapse ? '1.8rem' : '1.4rem' }}>
          <DrawerFooterSubBox>
            <Box>
              <Image src={helpIcon} alt="helpIcon" height={!collapse ? 20 : 25} />
            </Box>
            {!collapse && <HelpTypo>Help</HelpTypo>}
          </DrawerFooterSubBox>
          <DrawerFooterSubBox sx={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
            <Box>
              <Image src={logoutIcon} alt="logoutIcon" height={!collapse ? 20 : 25} />
            </Box>
            {!collapse && <LogputTypo>Logout Account</LogputTypo>}
          </DrawerFooterSubBox>
        </DrawerFooterMainBox>
      </StyledDrawer>
      <MainStyle open={true} drawerwidth={drawerWidth} style={{ background: 'white', height: '100dvh' }}>
        {children}
      </MainStyle>
      {/* <CustomModal value={saveAlert} setValue={setSaveAlert} maxWidth="25rem">
        <Box sx={{ padding: '1rem' }}>
          <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Leaving Page?
          </Typography>
          <Typography sx={{ fontSize: '0.9rem', fontWeight: 400 }}>
            Changes you made may not be saved.
          </Typography>
          <Box
            sx={{ display: 'flex', justifyContent: 'end', columnGap: '1rem', marginTop: '1rem' }}
          >
            <CloseButtonAddTask onClick={handleCloseConfirmRoute}>close</CloseButtonAddTask>
            <DoneButtonAddTask
              onClick={() => {
                setSaveAlert(false);
                router.push(pushedRoute);
              }}
            >
              Confirm
            </DoneButtonAddTask>
          </Box>
        </Box>
      </CustomModal> */}
    </Box>
  );
}
