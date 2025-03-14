import BlogIcon from '@/assets/images/svgs/icons/drawerIcons/blogIcon';
import BrochureIcon from '@/assets/images/svgs/icons/drawerIcons/brochureIcon';
import PresentationIcon from '@/assets/images/svgs/icons/drawerIcons/presentationIcon';
import PerformanceAdIcon from '@/assets/images/svgs/icons/drawerIcons/performanceAdIcon';
import RatingIcon from '@/assets/images/svgs/icons/drawerIcons/ratingIcon';
import TestimonialIcon from '@/assets/images/svgs/icons/drawerIcons/testimonialIcon';
import VideoIcon from '@/assets/images/svgs/icons/drawerIcons/videoIcon';
import WebsiteDomainIcon from '@/assets/images/svgs/icons/drawerIcons/WebsiteDomain';
import EmailCampaignIcon from '@/assets/images/svgs/icons/drawerIcons/emailIcon';
import SocialMediaIcon from '@/assets/images/svgs/icons/drawerIcons/socialMediaIcon';

export const MenuITEMS = [
  {
    title: 'Website Domain',
    icon: <WebsiteDomainIcon />,
    page: 'home',
    path: '/marketing-tool/website-domain'
  },
  {
    title: 'Email Campaigns, Newsletters',
    icon: <EmailCampaignIcon />,
    page: 'activities',
    path: '/marketing-tool/email'
  },
  {
    title: 'Blogs or Articles',
    icon: <BlogIcon />,
    page: 'retrospective_review',
    path: '/marketing-tool/blog'
  },
  {
    title: 'Presentations',
    icon: <PresentationIcon />,
    page: '',
    path: '/marketing-tool/presentation'
  },
  {
    title: 'Performance Advertising',
    icon: <PerformanceAdIcon />,
    page: '',
    path: '/marketing-tool/performance'
  },
  {
    title: 'Social Media',
    icon: <SocialMediaIcon />,
    page: '',
    path: '/marketing-tool/social-media'
  },
  {
    title: 'Testimonials and Endorsements',
    icon: <TestimonialIcon />,
    page: '',
    path: '/marketing-tool/testimonial'
  },
  {
    title: 'Reviews',
    icon: <RatingIcon />,
    page: '',
    path: '/marketing-tool/rating'
  },
  {
    title: 'Third-Party Rating',
    icon: <RatingIcon />,
    page: '',
    path: '/marketing-tool/rating'
  },
  {
    title: 'Brochures',
    icon: <BrochureIcon />,
    page: '',
    path: '/marketing-tool/brochure'
  },
  {
    title: 'Videos',
    icon: <VideoIcon />,
    page: '',
    path: '/marketing-tool/video'
  },
  {
    title: 'Reports',
    icon: <VideoIcon />,
    page: '',
    path: '/marketing-tool/video'
  },
  
  // {
  //   title: 'Blog or Article',
  //   icon: <RetrospectiveReviewIcon />,
  //   page: 'retrospective_review',
  //   path: '/retrospective_review',
  //   submenu: [
  //     {
  //       title: 'Review',
  //       icon: '',
  //       page: 'calendar',
  //       path: '/ria_fiduciary_review_tool/retrospective_review/review'
  //     },
  //     {
  //       title: 'Certification',
  //       icon: '',
  //       page: 'Onboarding',
  //       path: '/ria_fiduciary_review_tool/retrospective_review/certification'
  //     }
  //   ]
  // }
];
