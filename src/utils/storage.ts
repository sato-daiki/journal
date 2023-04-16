import { storage } from '@/constants/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

export const uploadStorageAsync = async (path, uri): Promise<string> => {
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, uri);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      );
      console.log('progress', progress);
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // setImgUrl(downloadURL);
        console.log('downloadURL', downloadURL);
      });
    },
  );

  // const blob: Blob = await new Promise((resolve, reject) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.onload = (): void => {
  //     resolve(xhr.response);
  //   };
  //   xhr.onerror = (): void => {
  //     reject(new TypeError('Network request failed'));
  //   };
  //   xhr.responseType = 'blob';
  //   xhr.open('GET', uri, true);
  //   xhr.send(null);
  // });

  // const snapshot = await ref.put(blob);
  // const url = await snapshot.ref.getDownloadURL();

  // return url;
};
