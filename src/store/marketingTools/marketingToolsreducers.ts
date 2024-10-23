import { combineReducers } from 'redux';
import websiteDomainReducer from './componentSlices/websiteDomainSlice';
import emailReducer from './componentSlices/emailSlice';
import ratingReducer from './componentSlices/ratingSlice';
import blogReducer from './componentSlices/blogSlice';
import performanceAdReducer from './componentSlices/performanceAdSlice';
import testimonialReducer from './componentSlices/testimonialSlice';
import videoReducer from './componentSlices/videoSlice';
import socialMediaReducer from './componentSlices/socialMediaSlice';
import brochureReducer from './componentSlices/brochureSlice';
import presentationReducer from './componentSlices/presentationSlice';

const marketingToolsReducer = combineReducers({
  websiteDomain: websiteDomainReducer,
  email: emailReducer,
  rating: ratingReducer,
  blog: blogReducer,
  performanceAd: performanceAdReducer,
  testimonial: testimonialReducer,
  video: videoReducer,
  socialMedia: socialMediaReducer,
  brochure: brochureReducer,
  presentation: presentationReducer
});

export default marketingToolsReducer;
