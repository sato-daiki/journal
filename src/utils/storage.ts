import storage from '@react-native-firebase/storage';

export const uploadStorageAsync = async (path, uri): Promise<string> => {
  const storageRef = storage().ref();
  const ref = storageRef.child(path);

  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = (): void => {
      resolve(xhr.response);
    };
    xhr.onerror = (): void => {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const snapshot = await ref.put(blob);
  const url = await snapshot.ref.getDownloadURL();

  return url;
};
