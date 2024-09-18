// import React from 'react'
// import { IconsDiv, Li, LogoDiv, MainContainer, SearchBar, SearchIcon, UlDiv } from './index.styles'
// import Image from 'next/image'

// const NavBar = () => {
//   return (
//       <MainContainer>
//         <LogoDiv>
//             <Image src="/svgs/Wordmark.svg" width={200} height={100} alt='' />
//         </LogoDiv>
//         <UlDiv>
//             <Li>Home</Li>
//             <Li>Operations</Li>
//             <Li>Tools</Li>
//             <Li>Policies</Li>
//             <Li>Administration</Li>
//             <Li>Insights</Li>
//         </UlDiv>
//         <IconsDiv>
//             <SearchBar placeholder='Search' />
//             <Image src="/svgs/UI.svg" width={40} height={40} alt='' />
//             <Image src="/svgs/account.svg" width={40} height={40} alt=''/>
//             <SearchIcon src="/svgs/Search.svg" width={40} height={40} alt='' />
//         </IconsDiv>
//       </MainContainer>
//   )
// }

// export default NavBar
import React from 'react';
import { useRouter } from "next/navigation";
import { IconsDiv, Li, LogoDiv, MainContainer, UlDiv } from './index.styles';
import Image from 'next/image';
import BasicMenu from '@/components/core/Menu/Menu';
import { IconButton, InputBase, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';

const NavBar = () => {
  const router = useRouter();
  const handleMenuItemClick = (item: string) => {
    if(item === 'Calender'){
      router.push('/tools')
    }
    console.log(`Clicked on ${item}`);
  };
  return (
    <MainContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px' }}>
        <LogoDiv>
          <Image src={'/svgs/secureRIALogo.svg'} width={110} height={52} alt="" />
        </LogoDiv>
        <IconsDiv>
          <Paper
            component="form"
            sx={{
              p: '2px',
              display: 'flex',
              alignItems: 'center',
              width: 145,
              height: 36,
              background: '#F4F5F6',
              borderRadius: '80px'
            }}
          >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <Search />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
          </Paper>
          <Image src="/svgs/UI.svg" width={36} height={36} alt="" />
          <Image src="/svgs/account.svg" width={36} height={36} alt="" />
        </IconsDiv>
      </div>
      <UlDiv>
        <Li onClick={()=>router.push('/home')}>Home</Li>
        <BasicMenu
          buttonTitle="Tools"
          menuItems={[
            'Calender',
            'Model Document',
            'Annual Compliance Review',
            'Cybersecurity Hub',
            'Mock Exam'
          ]}
          onItemClick={handleMenuItemClick}
        />
        <Li>Requests</Li>
        <BasicMenu
          buttonTitle="Policies"
          menuItems={['My Policies', 'Create New']}
          onItemClick={handleMenuItemClick}
        />
        <Li>Insights</Li>
      </UlDiv>
    </MainContainer>
  );
};

export default NavBar;
