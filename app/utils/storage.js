import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
});

export default storage;
