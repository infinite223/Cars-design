// import * as MusicPicker from "expo-music-picker";

// export const pickMediaAsync = async () => {
//     try {
//       // Request permissions
//       const permissionResult = await MusicPicker.requestPermissionsAsync();
//       if (!permissionResult.granted) {
//         console.warn("No permission");
//         return;
//       }

//       // Open the music picker
//       const result = await MusicPicker.openMusicLibraryAsync({
//         allowMultipleSelection: true,
//         includeArtworkImage: true,
//       });

//       // Process the result
//       console.log(result);
//       if (!result.cancelled) {
//         const [firstItem] = result.items;
//         // setItem(firstItem ?? null);
//       }
//     } catch (e) {
//       console.warn("Exception occurred when picking music:", e);
//     }
//   };
