import { combineReducers } from '@reduxjs/toolkit';

import auth from './auth';
import app from './app';
import marketingToolsReducer from './marketingTools/marketingToolsreducers';

const rootReducer = combineReducers({
  auth,
  app,
  marketingTools: marketingToolsReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
