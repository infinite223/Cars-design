import { Audio } from "expo-av";

export async function playSound(soundCheck:string) {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({uri: soundCheck})

    console.log('Playing Sound');
    await sound.playAsync();
  }