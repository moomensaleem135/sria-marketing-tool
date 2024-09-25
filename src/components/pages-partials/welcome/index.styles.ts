import { COLORS } from '@/constants/colors';
import styled from '@emotion/styled';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Nav = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLORS.WHITE_100};
  height: 10vh;
`;

export const LogoBox = styled.div`
  display: flex;
  padding: 0 3rem;
  align-items: center;
`;

export const DivButton = styled.div`
  padding: 1rem 3rem;
  button {
    background-color: ${COLORS.BLUE_200};
    padding: 0.3rem 1.5rem;
  }
`;

export const ImageDiv = styled.div`
  opacity: 0.7;
  height: 85vh;
  text-align: center;

  background-image: url('/svgs/Picture.svg');
  // background-position: fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const TextDiv = styled.div``;

export const Heading = styled.h1`
  font-family: Inter;
  font-style: normal;
  font-weight: 1000;
  font-size: 48px;
  color: ${COLORS.WHITE_100};
  @media (max-width: 1440px) {
    font-size: 48px;
  }

  @media (max-width: 1024px) {
    font-size: 38px;
  }
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const SubHeading = styled.h2`
  line-height: 2;
  font-family: Inter;
  font-style: normal;
  font-size: 28px;
  font-weight: 600;
  color: ${COLORS.WHITE_100};
  @media (max-width: 1440px) {
    font-size: 28px;
  }

  @media (max-width: 1024px) {
    font-size: 18px;
  }
  @media (max-width: 768px) {
    line-height: 1.5;
    font-size: 18px;
  }
`;

export const Btn = styled.div`
  padding: 0 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  button {
    color: ${COLORS.BLACK_100};
    background-color: ${COLORS.WHITE_100};
    padding: 0.5rem 1.9rem;
    color: var(--Grey-1000, #151618);
    text-align: center;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    top: 70%;
  }
  @media (max-width: 1440px) {
    top: 75%;
  }
  @media (max-width: 1233px) {
    top: 89%;
  }

  @media (max-width: 1086px) {
    top: 85%;
  }
  @media (max-width: 768px) {
  }
`;

export const FooterContainer = styled.div`
  background-color: ${COLORS.BLUE_100};
  height: 5vh;
`;
