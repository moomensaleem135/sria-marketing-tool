'use client';
import styled from '@emotion/styled';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Collapse,
  Menu,
  MenuItem,
  MenuProps,
  Modal,
  Typography,
  useMediaQuery
} from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';

import * as React from 'react';
import { useEffect } from 'react';

// import CustomModal from '@/components/core/CustomModal';
// import {
//   CloseButtonAddTask,
//   DoneButtonAddTask
// } from '@/components/core/TaskBuilderNav/index.styles';

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
  CustomListItemText,
  ListItemTextSubMenuStyledActive,
  ListItemTextSubMenuStyledInActive,
  StyledListItemButton,
  CollapseArrowBox,
  IconSpan,
  SideBarNavList,
  StyledDrawer,
  SidebarStyledListItem
} from './index.styles';
import { MenuITEMS } from './menu';

interface Props {
  children: React.ReactNode;
  pageTitle: string;
}
export const HIDDEN_ROUTES_LEFT_DRAWER = ['/', '/login', '/profile', '/support'];

export default function LeftDrawer({ children, pageTitle }: Props) {
  const router = useRouter();

  const isTablet = useMediaQuery('(max-width: 960px)');
  const [openD, setOpenD] = React.useState(false);
  const [collapse, setCollapse] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [pushedRoute, setPushedRoute] = React.useState<string>('');

  const [openMenu, setOpenMenu] = React.useState<string | null>('');
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
    if (path === '/activities/tasks' || path === `/activities/tasks/${taskId}`) {
      const isSaved = localStorage.getItem('isSaved');

      setSaveAlert(true);
    } else {
      router.push(route);
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
              <Image src={logo} alt="" />
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
                {/* {item?.submenu && item?.submenu?.length > 0 ? (
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
                          onClick={(e) => handleClickMenu(e, item.title)}
                          path={path}
                          itemPath={item.path}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ListItemIcon sx={{ minWidth: '0', marginRight: '15px' }}>
                              {item.icon}
                            </ListItemIcon>

                            {path.includes(item.path) ? (
                              item.path === '/policies' && path.includes('annualreviewtool') ? (
                                <Typography sx={{ color: 'black' }}>{item.title}</Typography>
                              ) : (
                                <Typography sx={{ color: 'white' }}>{item.title}</Typography>
                              )
                            ) : (
                              <Typography sx={{ color: 'black' }}>{item.title}</Typography>
                            )}
                          </Box>

                          {openMenu === item.title ? <ExpandLess /> : <ExpandMore />}
                        </StyledListItemButton>
                      )}

                      {collapse ? (
                        <StyledMenu
                          id="demo-customized-menu"
                          MenuListProps={{
                            'aria-labelledby': 'demo-customized-button'
                          }}
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl) && openMenu === item.title}
                          onClose={handleClose}
                        >
                          {item.submenu.map((ele, index) => (
                            <MenuItem
                              key={index}
                              onClick={() => {
                                setPushedRoute(ele.path);
                                handleRoutePush(ele.path); // Handle route navigation
                                handleClose(); // Close menu after selection
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
                        <Collapse
                          in={openMenu === item.title}
                          timeout="auto"
                          unmountOnExit
                          orientation="vertical"
                        >
                          <Box style={{ marginTop: '10px' }}>
                            {item.submenu.map((ele, index) => {
                              return (
                                <List
                                  component="div"
                                  key={index}
                                  disablePadding
                                  onClick={(e) => {
                                    setPushedRoute(ele.path);
                                    handleRoutePush(ele.path);
                                  }}
                                  style={{
                                    borderLeft: '1px dashed white',
                                    marginLeft: '18px',
                                    paddingLeft: '23px'
                                  }}
                                >
                                  <ListItemButton
                                    sx={{ pl: 2, borderRadius: '5px' }}
                                    disabled={ele.isDisabled}
                                  >
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
                  ) : ( */}
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
