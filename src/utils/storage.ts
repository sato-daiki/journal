import storage from '@react-native-firebase/storage';

export const uploadStorageAsync = async (path, uri): Promise<string> => {
  const reference = storage().ref(path);
  // uploads file
  await reference.putFile(uri);
  const url = await storage().ref(path).getDownloadURL();
  return url;
};
