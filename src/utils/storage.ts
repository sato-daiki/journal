import { ImageInfo } from '@/types';
import storage from '@react-native-firebase/storage';
import * as ImageManipulator from 'expo-image-manipulator';

export const uploadStorageAsync = async (path, uri): Promise<string> => {
  const reference = storage().ref(path);
  // uploads file
  await reference.putFile(uri);
  const url = await storage().ref(path).getDownloadURL();
  return url;
};

export const deleteStorageAsync = async (path): Promise<boolean> => {
  try {
    const reference = storage().ref(path);
    // uploads file
    await reference.delete();
    return true;
  } catch {
    return false;
  }
};

export const uploadImageAsync = async (
  path: string,
  photoUrl: string,
  width = 500,
): Promise<string> => {
  const ret = await ImageManipulator.manipulateAsync(photoUrl, [
    { resize: { width } },
  ]);
  const url = await uploadStorageAsync(path, ret.uri);
  return url;
};

export const insertImages = async (
  uid: string,
  diaryId: string,
  images: ImageInfo[],
) => {
  if (images.length === 0) return null;
  const newImages: ImageInfo[] = [];
  for (let i = 0; i < images.length; i++) {
    const postIndex = Date.now().toString();
    const path = `images/${uid}/${diaryId}/${postIndex}`;
    const uploadUrl = await uploadImageAsync(path, images[i].imageUrl);
    newImages.push({
      imageUrl: uploadUrl,
      imagePath: path,
    });
  }
  return newImages;
};

const checkAndDeleteImages = async (
  afterImages: ImageInfo[] | null,
  beforeImages: ImageInfo[],
) => {
  for (let i = 0; i < beforeImages.length; i++) {
    let isDelete;
    if (!afterImages || afterImages.length === 0) {
      isDelete = true;
    } else {
      isDelete = !afterImages.includes(beforeImages[i]);
    }
    if (isDelete) {
      await deleteStorageAsync(beforeImages[i].imagePath);
    }
  }
};

const checkAndInsertImages = async (
  uid: string,
  diaryId: string,
  afterImages: ImageInfo[],
  beforeImages: ImageInfo[] | null | undefined,
) => {
  let newAfterImages: ImageInfo[] = [];
  for (let i = 0; i < afterImages.length; i++) {
    let isInsert;
    if (!beforeImages || beforeImages.length === 0) {
      isInsert = true;
    } else {
      isInsert = !beforeImages.includes(afterImages[i]);
    }
    if (isInsert) {
      const postIndex = Date.now().toString();
      const path = `images/${uid}/${diaryId}/${postIndex}`;
      const uploadUrl = await uploadImageAsync(path, afterImages[i].imageUrl);
      newAfterImages.push({
        imageUrl: uploadUrl,
        imagePath: path,
      });
    } else {
      newAfterImages.push(afterImages[i]);
    }
  }
  return newAfterImages;
};

export const updateImages = async (
  uid: string,
  diaryId: string,
  afterImages: ImageInfo[] | null,
  beforeImages: ImageInfo[] | null | undefined,
) => {
  console.log('afterImages', afterImages);
  console.log('beforeImages', beforeImages);

  if (beforeImages && beforeImages.length > 0) {
    await checkAndDeleteImages(afterImages, beforeImages);
  }

  if (afterImages && afterImages.length > 0) {
    const newAfterImages = await checkAndInsertImages(
      uid,
      diaryId,
      afterImages,
      beforeImages,
    );
    return newAfterImages;
  } else {
    return afterImages;
  }
};
