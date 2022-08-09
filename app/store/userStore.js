import {createSlice} from '@reduxjs/toolkit';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
  },
  reducers: {
    setUserInfo: (state, actoions) => {
      console.log(actoions);
      // 修改用户信息
      state.userInfo = {
        ...state.userInfo,
        ...actoions.payload,
      };

      // 持久化 start
      storage.save({
        key: 'userInfo', // Note: Do not use underscore("_") in key!
        data: state.userInfo,
        expires: 1000 * 3600,
      });
    },
    clearUserInfo: state => {
      state.userInfo = {};
      storage.remove({
        key: 'userInfo',
      });
    },
  },
});

export const {setUserInfo} = userSlice.actions;
export const {clearUserInfo} = userSlice.actions;

export default userSlice.reducer;
