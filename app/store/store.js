import {configureStore} from '@reduxjs/toolkit';
import userStore from './userStore';
export default configureStore({
  reducer: {
    userStore,
  },
});
