import { ImageInfo } from '@/types';
import storage from '@react-native-firebase/storage';
import * as ImageManipulator from 'expo-image-manipulator';
import { getUuid } from './common';

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
  width = 300,
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
    const uuid = await getUuid();
    const path = `images/${uid}/${diaryId}/${uuid}`;
    const uploadUrl = await uploadImageAsync(path, images[i].imageUrl);
    newImages.push({
      imageUrl: uploadUrl,
      imagePath: path,
    });
  }
  return newImages;
};

export const updateImages = async (
  uid: string,
  diaryId: string,
  afterImages: ImageInfo[] | null,
  beforeImages: ImageInfo[] | null | undefined,
) => {
  if (beforeImages && beforeImages.length > 0) {
    let deleteImages: ImageInfo[] = [];
    if (!afterImages || afterImages.length === 0) {
      deleteImages = beforeImages;
    } else {
      deleteImages = beforeImages.filter((b) => afterImages.includes(b));
    }
    deleteImages.forEach(async (deleteImage) => {
      await deleteStorageAsync(deleteImage.imagePath);
    });
  }

  if (afterImages && afterImages.length > 0) {
    let newAfterImages = [...afterImages];

    let updateImages: ImageInfo[] = [];
    if (!beforeImages || beforeImages.length === 0) {
      updateImages = afterImages;
    } else {
      updateImages = afterImages.filter((a) => beforeImages.includes(a));
    }
    updateImages.forEach(async (updateImage) => {
      const uuid = await getUuid();
      const path = `images/${uid}/${diaryId}/${uuid}`;
      const uploadUrl = await uploadImageAsync(path, updateImage.imageUrl);
      const newNewAfterImages = newAfterImages.map((a) => {
        if (a === updateImage) {
          return { imageUrl: uploadUrl, imagePath: path };
        }
        return a;
      });
      newAfterImages = [...newNewAfterImages];
    });
    return newAfterImages;
  }
  return afterImages;
};
