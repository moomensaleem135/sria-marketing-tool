// import { COLORS } from "@/constants/colors";
// import styled from "@emotion/styled";
// import Image from "next/image";

// export const MainContainer = styled.div`
// display: flex;
// padding:0rem 1rem;
// justify-content: space-between;
// box-shadow: 1px 1px #C3CAD2 ;
// `

// export const LogoDiv = styled.div`

// `
// export const UlDiv = styled.div`
// display: flex;
// list-style: none;
// align-items: center;
// margin-top: 6rem;
// justify-content: space-between;
// width: 100%;
// `
// export const Li =styled.li`
// margin:0 4rem;
// `

// export const IconsDiv = styled.div`
// display: flex;
// align-items: center;
// justify-content: space-between;
// width: 100%;
// `

// export const SearchBar = styled.input`
// border-radius: 80px;
// background: var(--Grey-200, #F4F5F6);
// border-style: none;
// display: flex;
// padding: 1rem 0.5rem;
// align-items: center;
// font-size: 1em;
// text-align: center;
// position: relative;
// `
// export const SearchIcon = styled(Image)`
// position: absolute;
// margin-left: 10px;
// `
import styled from "@emotion/styled";
import Image from "next/image";

export const MainContainer = styled.div`
  display: flex;
  flex-direction:column;
  align-items: space-arround;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 0 40px;
`;

export const LogoDiv = styled.div`
`;

export const UlDiv = styled.ul`
  display: flex;
  justify-content:space-around;
  list-style: none;
  margin: 0 8rem;
  padding: 0;
`;

export const Li = styled.li`
  margin: 0 1rem;
  color: #003165;
  font-weight: bold;
  cursor: pointer;
`;

export const IconsDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap:16px
`;

export const SearchBar = styled.input`
  border-radius: 80px;
  background-color: #F4F5F6;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1em;
  outline: none;
`;

export const SearchIcon = styled(Image)`
  margin-left: 10px;
`;