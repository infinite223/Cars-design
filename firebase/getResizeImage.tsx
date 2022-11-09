import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const getResizeImage = async (uri:string) =>
  {
    const resizedPhoto = await manipulateAsync(
        uri,
        [{ resize: { width: 1000 } }], 
        { compress: 0.4, format: SaveFormat.JPEG },
    );

    return resizedPhoto
  }