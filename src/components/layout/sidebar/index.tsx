"use client";
import * as React from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import FirstPageSharpIcon from "@mui/icons-material/FirstPageSharp";
import LastPageSharpIcon from "@mui/icons-material/LastPageSharp";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Menu, MenuItem, Toolbar, useMediaQuery } from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";

import { MenuITEMS } from "./menu";

import {
  DivFlex,
  FlexRow,
  ListItemTextStyled,
  TypographyStyled,
  DrawerHeader,
  MainStyle,
  DivRow,
  DivTitle,
  DivProfile,
  AppBarStyle,
  DivOne,
  DivTwo,
  DivThree,
  DIV,
  ListItemTextStyledActive,
} from "./index.styles";
import { COLORS } from "../../../constants/colors";

interface Props {
  children: React.ReactNode;
  pageTitle: string;
}

export default function LeftDrawer({ children, pageTitle }: Props) {
  const router = useRouter();
  const pathname = usePathname()

  const isTablet = useMediaQuery("(max-width: 960px)");
  const isScroll = useMediaQuery("(max-width: 1295px) and (max-height:768px)");

  const [collapse, setCollapse] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoToSettings = () => {
    router.push("/branchSetting");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAnchorEl(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    setCollapse(isTablet);
  }, [isTablet]);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  const drawerWidth = collapse ? 80 : 240;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBarStyle position="fixed" open={true} drawerwidth={drawerWidth}>
        <Toolbar
          sx={{
            background: "white",
            paddingBlock: "3.2rem",
          }}
        >
          <DivRow>
            <DivTitle>{pageTitle}</DivTitle>
            <DivProfile>
              <DivOne>
                {/* <Image src={"/svgs/bell.svg"} width={25} height={25} /> */}
              </DivOne>
              <DivTwo>
                {/* <Image src={"/svgs/search.svg"} width={25} height={25} /> */}
              </DivTwo>
              <DivThree>
                <Image
                alt=""
                  src={"/svgs/dummyprofile.svg"}
                  width={50}
                  height={50}
                  onClick={handleClick}
                />
              </DivThree>
            </DivProfile>
          </DivRow>
        </Toolbar>
      </AppBarStyle>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            overflowY: "visible",
            transition: "all 0.1s ease-in-out",
            boxShadow: "8px 0 10px -6px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <DrawerHeader>
          <DivFlex>
            {collapse ? (
              <Image src={"/svgs/logo"} width={60} height={60} alt="" />
            ) : (
              <Image src={"/svgs/logo"} width={85} height={85} alt="" />
            )}
          </DivFlex>
        </DrawerHeader>
        <Divider
          sx={
            collapse
              ? { width: "4rem", marginInline: "auto" }
              : { width: "12rem", marginInline: "auto" }
          }
        />
        <DIV>
          <List
            sx={{
              overflowX: "hidden",
              overflowY: isScroll ? "hidden" : "hidden",
              padding: 0,
            }}
          >
            {MenuITEMS.map((item) => (
              <ListItem
                key={item.title}
                sx={{ display: "block", paddingBottom: "0px" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "center",
                  }}
                  onClick={() => router.push(item.path)}
                >
                  {/* <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: collapse ? 0 : 4,
                      justifyContent: "center",
                    }}
                  >
                    {!collapse && pathname.includes(item.page)
                      ? item.icon1
                      : item.icon}
                  </ListItemIcon> */}
                  {/* {!collapse &&
                    ( pathname.includes(item.page) ? (
                      <ListItemTextStyledActive primary={item.title} />
                    ) : (
                      <ListItemTextStyled primary={item.title} />
                    ))} */}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <FlexRow onClick={toggleCollapse}>
            {!collapse ? <FirstPageSharpIcon /> : ""}
            <TypographyStyled paddingLeft={collapse ? 0 : 1.5}>
              {collapse ? <LastPageSharpIcon /> : ""}
            </TypographyStyled>
          </FlexRow>
        </DIV>
      </Drawer>
      <MainStyle open={true} drawerwidth={drawerWidth}>
        {children}
      </MainStyle>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "& .css-ptiqhd-MuiSvgIcon-root": {
              color: `${COLORS.THEME_COLOR}`,
            },
            "& .css-1a2vgp9-MuiButtonBase-root-MuiMenuItem-root ": {
              fontSize: "16px",
              fontWeight: "700",
            },

            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleGoToSettings}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Branch Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
