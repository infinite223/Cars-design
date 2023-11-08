import { Audio } from "expo-av";

export async function playSound(soundCheck:string, play:boolean) {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({uri: soundCheck})

    if(play){
      await sound.playAsync();
      console.log('Playing Sound');
    }
    else {
      await sound.stopAsync()
      console.log('stop playing Sound');
    }
  }