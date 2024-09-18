import Button from "@/components/core/Button";
import { COLORS } from "@/constants/colors";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export const Main = styled(Box)`
  padding: 1rem;
  width: 25rem;
  height: auto;
`;
export const UpperContainer = styled(Box)``;
export const LowerContainer = styled(Box)``;
export const TopDiv = styled.div`
  display: flex;
`;

export const Title = styled(Typography)`
  font-family: Inter;
  margin-top: 1rem;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;
export const Schedule = styled(Typography)`
  /* font-family: Inter; */
  font-size: 15px;
`;

export const Details = styled(Typography)`
  margin: 1rem 0;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
`;

export const Typography1 = styled(Typography)`
  color: ${COLORS.BLUE_200};
  border: 1px solid ${COLORS.BLUE_200};
  border-radius: 5px;
  padding: 0.2rem;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
`;
export const Typography2 = styled(Typography)`
  margin-left: auto;
  background-color: #c3cad2;
  border-radius: 5px;
  padding: 0.3rem;
  font-size: 15px;
  text-align: center;
  font-weight: 500;
`;

export const SubTitle = styled(Typography)`
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
`;
export const FrameBox = styled(Box)`
    display: flex;
    /* justify-content: space-between; */
`
export const Frame = styled(Box)`
    margin-top:1rem;
`
export const Name = styled(Typography)`
    font-size: 18px;
`
export const Print = styled(Image)`
    object-fit: cover;
`
export const StyledButton =styled(Button)`
width: 100%;
background-color: ${COLORS.BLUE_600};
`