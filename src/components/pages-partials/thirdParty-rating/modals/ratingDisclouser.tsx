import CustomModal from '@/components/core/Modal';
import { COLORS } from '@/constants/colors';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

const RatingDisclouser = ({ text1, text2 }: { text1: string; text2: string }) => {
  const [isDisclouserModal, setIsDisclouserModal] = useState<boolean>(false);

  return (
    <Box>
      <Typography sx={{ fontSize: '0.8rem' }}>
        {text1}
        <span
          style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => setIsDisclouserModal(true)}
        >
          {' '}
          Click here&nbsp;
        </span>{' '}
        {text2}
      </Typography>
      <CustomModal
        openValue={isDisclouserModal}
        closeFunction={() => setIsDisclouserModal(false)}
        closedIcon={true}
        modalWidth={'37rem'}
      >
        <Box>
          <Typography sx={{ fontSize: '1.2rem', color: COLORS.BLUE_600, textAlign: 'center' }}>
            BARRON’S
          </Typography>
          <Typography sx={{ fontSize: '1rem', color: COLORS.BLUE_600, textAlign: 'center' }}>
            Top 1200
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '0.2rem' }}>
            <Typography sx={{ fontSize: '1.2rem' }}>Jason Smith</Typography>
            <Typography sx={{ fontSize: '1rem' }}>Partner, Raymond Co.</Typography>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', rowGap: '0.5rem', marginTop: '1rem' }}
            >
              <Typography sx={{ fontSize: '1rem' }}>
                With over 20 years of experience in the financial services industry, Jason is a
                seasoned Registered Investment Advisor known for his comprehensive approach to
                wealth management. Jason began his career at a prominent investment firm where he
                honed his skills in portfolio management and financial planning. His expertise spans
                across diverse asset classes, including equities, fixed income, and alternative
                investments.
              </Typography>
              <Typography sx={{ fontSize: '1rem' }}>
                Jason earned his Bachelor’s degree in Finance from the University of Michigan and
                later achieved both the Chartered Financial Analyst (CFA) and Certified Financial
                Planner (CFP®) designations, reflecting his commitment to the highest standards of
                professional practice. Throughout his career, he has been dedicated to helping
                clients achieve their financial goals through tailored investment strategies and
                proactive financial planning.
              </Typography>
              <Typography sx={{ fontSize: '1rem' }}>
                In addition to his professional qualifications, Jason is a frequent speaker at
                industry conferences and contributes to financial publications, sharing insights on
                market trends and investment strategies. He is known for his client-centric
                approach, focusing on personalized solutions that align with each client’s unique
                financial situation and objectives.
              </Typography>
              <Typography sx={{ fontSize: '1rem' }}>
                Jason has been recognized as one of the top financial advisors in the nation,
                earning a spot on Barron’s prestigious list of the Top 1,200 Advisors six times
                throughout his career. This consistent recognition underscores his exceptional skill
                in delivering outstanding investment strategies and personalized client service.
                Jason’s repeated appearance on this list reflects his dedication to excellence and
                his ability to navigate complex financial landscapes with remarkable success.
              </Typography>
              <Typography sx={{ fontSize: '1rem' }}>
                Outside of work, Jason is an avid golfer and enjoys exploring the outdoors with his
                family. He is also actively involved in community service, supporting local
                charities and financial literacy programs.
              </Typography>
            </Box>
            <hr />
            <Typography sx={{ fontSize: '1rem', color: COLORS.BLUE_600 }}>
              Barron’s is a registered trademark of Dow Jones & Company, L.P., with all rights
              reserved. This ranking is determined using an algorithm that incorporates both
              qualitative criteria—primarily gathered through telephone and in-person interviews—and
              quantitative data. It reflects performance from April 7, 2022, to June 30, 2023, and
              was published on April 3, 2024. To be considered, advisors must have at least six
              years of experience. Investment performance is not a direct factor in the rankings, as
              not all advisors have audited performance records and because results can be more
              reflective of clients’ risk tolerances rather than the advisor’s skill in investment
              selection. Inclusion in Barron’s list should not be seen as an endorsement of Jason
              Smith or his firm, nor does it suggest that the survey results reflect the experiences
              of all clients. Neither Jason Smith his firm paid any fees to be included in this
              ranking.
            </Typography>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default RatingDisclouser;
