import { COLORS } from '@/constants/colors';
import styled from '@emotion/styled';
import { ColorizeSharp } from '@mui/icons-material';
import { Box, MenuItem, Paper, Typography } from '@mui/material';
import Image from 'next/image';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-arround;
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
  background-color: white;
  /* padding: 20px 40px; */
  height: 15%;
`;

export const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.3rem;
`;

export const UlDiv = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 0 8rem;
  padding: 0;
`;

export const Li = styled.li`
  margin: 0 1rem;
  color: #003165;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
`;

export const IconsDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`;

export const SearchBar = styled.input`
  border-radius: 80px;
  background-color: #f4f5f6;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1em;
  outline: none;
`;

export const SearchIcon = styled(Image)`
  margin-left: 10px;
`;
export const UserNameText = styled(Typography)`
  color: ${COLORS.BLUE_THEME_MAIN};
  font-weight: 600;
  text-transform: capitalize;
`;
export const NavBarSearchInput = styled(Paper)`
  padding: 2px;
  display: flex;
  align-items: center;
  width: 145px;
  height: 36px;
  background: #f4f5f6;
  border-radius: 80px;
`;
export const NavBarMain = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;
export const StyledProfileDropDownItem = styled(MenuItem)`
  display: flex;
  column-gap: 0.4rem;
  align-items: center;
`;
