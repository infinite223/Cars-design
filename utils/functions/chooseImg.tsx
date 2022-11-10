import * as ImagePicker from 'expo-image-picker';

export const chooseImg = async (images:any[], setImages: (value:any[]) => void) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,			
        allowsEditing: true,
    });


    if (!result.cancelled) {
       setImages([...images, {...result, place: {}}]);
    }
};