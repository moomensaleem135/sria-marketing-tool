import styled from '@emotion/styled';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import { COLORS } from '../../../constants/colors';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerwidth: number;
}
interface StyledListItemButtonProps {
  path: string;
  itemPath: string;
}
export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  // paddingTop: '1rem',
  // marginTop: '-0.5rem',
  minHeight: '8rem'
}));

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 3.5rem;
  cursor: pointer;
  padding-left: 2rem;
  padding-bottom: 1rem;
  svg {
    position: absolute;
    height: 1em;
    top: 50%;
    right: -19px;
    background-color: ${COLORS.WHITE_100};
    border: 1px solid ${COLORS.THEME_COLOR};
    border-radius: 45px;
    color: ${COLORS.THEME_COLOR};
    width: 35px;
    height: 35px;
  }
`;
export const TypographyStyled = styled(Typography)(({ paddingLeft }) => ({
  paddingLeft: `${paddingLeft}rem`,
  fontWeight: 900,
  fontSize: 16
}));
export const ListItemTextStyled = styled(ListItemText)(() => ({
  display: 'flex',
  color: `${COLORS.BLACK_100}`,
  alignItems: 'center',
  fontSize: '16px',
  fontStyle: 'normal',
  position: 'relative',
  '& .MuiTypography-root': {
    fontWeight: 900
  }
}));

export const ListItemTextStyledActive = styled(Typography)(() => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '16px',
  fontStyle: 'normal',
  position: 'relative',

  color: 'white'
}));

export const AppBarStyle = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ open, drawerwidth }) => ({
  background: `${COLORS.WHITE_100}`,
  width: `calc(100% - ${drawerwidth}px)`,
  transition: 'all 0.3s ease-in-out',
  ...(open && {
    marginLeft: drawerwidth,
    width: `calc(100% - ${drawerwidth}px)`,
    transition: 'all 0.1s ease-in-out'
  })
}));

export const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open'
})<{
  open?: boolean;
  drawerwidth: number;
}>(({ open, drawerwidth }) => ({
  // marginTop: '6rem',
  // position: 'absolute',
  // marginLeft: drawerwidth + 120,
  // height: '50%',
  width: `calc(100% - ${drawerwidth}px)`,
  transition: 'all 0.3s ease-in-out',
  // border:'1px solid green',
  // padding:'0 15%',
  margin: '6rem 2rem 1rem 2rem',
  ...(open && {
    width: `calc(100% - ${drawerwidth}px)`,
    // marginLeft: drawerwidth - 20,
    transition: 'all 0.1s ease-in-out',
    // padding: '0 0 0 3rem',
    // marginRight: '0 !important',
    // border:'1px solid red',
    // padding:'0 15%',
    margin: '6rem 2rem 1rem 2rem'
    // maxWidth:'1100px'
  }),
  '& .MuiContainer-root': { marginInline: '0', overflow: 'hidden' }
}));

export const DivRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-inline: 2rem;
  width: 100%;
`;

export const DivTitle = styled.h2`
  color: ${COLORS.THEME_COLOR};
  font-style: normal;
  font-weight: 700;
  @media (max-width: 960px) {
    font-size: 18px;
  }
`;

export const DivProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: space-evenly;
  width: 15%;
  justify-content: flex-end;

  @media (max-width: 1280px) {
    width: 35%;
  }
`;
export const DivOne = styled.div`
  cursor: pointer;
`;
export const DivTwo = styled.div`
  cursor: pointer;
`;
export const DivThree = styled.div`
  cursor: pointer;
`;

export const DIV = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80dvh;
  overflow: auto;
`;

export const SvgDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  svg {
    color: ${COLORS.THEME_COLOR};
  }
  .css-8pxyhm svg {
    color: ${COLORS.THEME_COLOR};
  }
`;
// nested
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerwidth: number;
}

export const SideBarMain = styled(Box)`
  display: flex;
`;
export const TopBar = styled(Box)`
  height: 2rem;
  margin: 0 1rem;
`;
export const ProfileMainBox = styled(Box)`
  display: flex;
  width: 250px;
  padding: 5px 10px;
  gap: 20px;
  border-bottom: 1px solid #bfbebe80;
  width: 100%;
`;
export const ProfileNameTypo = styled(Box)`
  color: #184063;
  font-size: 24px;
  font-weight: 700;
`;
export const ProfileEmailTypo = styled(Box)`
  color: #00000066;
  font-size: 14px;
  font-weight: 400;
`;
export const MenuGenericMainBox = styled(Box)`
  display: flex;
  width: 250px;
  padding: 0px 10px;
  gap: 20px;
  align-items: center;
`;
export const MainHeadingTypo = styled(Typography)`
  font-size: 32px;
  font-weight: 700;
  color: #114063;
`;
// sub menu item style
export const ListItemTextSubMenuStyledActive = styled(ListItemText)(() => ({
  '& .MuiTypography-root': {
    fontWeight: 700,
    fontSize: '14px',
    color: `${COLORS.BLUE_THEME_MAIN}`,
    whiteSpace: 'nowrap'
  }
}));
export const ListItemTextSubMenuStyledInActive = styled(ListItemText)(() => ({
  '& .MuiTypography-root': {
    fontWeight: 400,
    fontSize: '14px',
    color: 'black',
    whiteSpace: 'nowrap'
  }
}));
export const CustomListItemText = styled(Typography)`
  font-weight: 700 !important;
  color: 'white';
`;
export const StyledListItemButton = styled(ListItemButton)<StyledListItemButtonProps>(
  ({ theme, path, itemPath }) => ({
    backgroundColor: path.includes(itemPath)
      ? itemPath === '/policies' && path.includes('annualreviewtool')
        ? 'white'
        : COLORS.BLUE_THEME_MAIN
      : 'white',
    borderRadius: '10px',
    marginRight: '23px !important',
    fill: path.includes(itemPath)
      ? itemPath === '/policies' && path.includes('annualreviewtool')
        ? 'black'
        : 'white'
      : 'black',
    color: path.includes(itemPath)
      ? itemPath === '/policies' && path.includes('annualreviewtool')
        ? 'black'
        : 'white'
      : 'black',
    '&:hover': {
      backgroundColor: path.includes(itemPath)
        ? itemPath === '/policies' && path.includes('annualreviewtool')
          ? COLORS.GREY_200
          : COLORS.BLUE_THEME_MAIN
        : COLORS.GREY_200
    },
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: '5px !important'
  })
);
export const CollapseArrowBox = styled(Box)`
  position: absolute;
  right: 10px;
  /* top: 10px; */
`;
export const IconSpan = styled('span')`
  cursor: pointer;
`;

export const SideBarNavList = styled(List)`
  width: 95%;
  margin-left: 5px;
  margin-right: 5px;
  padding: 10px;
  padding-bottom: 0;
`;
export const StyledDrawer = styled(Drawer)`
  flex-shrink: 0;
  position: relative;

  & .MuiDrawer-paper {
    box-sizing: border-box;
    transition: all 0.1s ease-in-out;
    box-shadow: 8px 0 10px -6px rgba(0, 0, 0, 0.5);
  }
`;
export const SidebarStyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0px;
`;
