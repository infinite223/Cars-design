import * as ImagePicker from 'expo-image-picker';

export const chooseImg = async (images:any[] | undefined, setImages: (value:any[]) => void, id?:number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,			
        allowsEditing: true,
    });


    if (!result.canceled && images) {
        console.log(result)
        if(id!==undefined){
            setImages([...images, {...result, place: {}, id:id}]);
            console.log('dodaje')
        }
        else{
            setImages([...images, {...result, place: {}}]);
        }
    }
};