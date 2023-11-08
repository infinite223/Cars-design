export const hexToRGB = (hex) => {
    let r = 0, g = 0, b = 0;
    // handling 3 digit hex
    if(hex.length == 4){
       r = "0x" + hex[1] + hex[1];
       g = "0x" + hex[2] + hex[2];
       b = "0x" + hex[3] + hex[3];
       // handling 6 digit hex
    }else if (hex.length == 7){
 
       r = "0x" + hex[1] + hex[2];
       g = "0x" + hex[3] + hex[4];
       b = "0x" + hex[5] + hex[6];
    };
 
    return{
       red: +r,
       green: +g,
       blue: +b
    };
 }