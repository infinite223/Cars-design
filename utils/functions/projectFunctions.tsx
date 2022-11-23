import { Share } from 'react-native';

export const onShare = async (carMake:string, model:string, link:string) => {
    try {
      const result = await Share.share({
        message:
          `Cars projects- ${carMake+ ' ' +model+' ' + link}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
    
    }
};

export const likeProject = (id:string) => {
    //..... like project
    console.log(id)
}