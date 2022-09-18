export const getColorsCircle = (value:number, type:string) => {
    let colors:string[] = ["gray", "lightgray"]
    const colorsTypes = {
        great: ["#f34", "#baa", "#a33", "#811"],
        veryGood:  ["#ff7002", "#aa4002", "#855", "#715"],
        good: ["#fad006", "#e9a004", "#c9a235", "#fca048"],
        medium: ["#87a569", "#87a569", "#258d4d", "#088538"]
    }

    switch (type) {
        case "hp":
            if(value>=600){
                colors = colorsTypes.great
            }
            else if(value>=400 && value<600){
                colors = colorsTypes.veryGood
            }
            else if(value>=250 && value<400){
                colors = colorsTypes.good
            }
            else if(value<250){
                colors = colorsTypes.medium
            }
        break;
        case "nm":
            if(value>=700){
                colors = colorsTypes.great       
            }
            else if(value>=500 && value<700){
                colors = colorsTypes.veryGood
            }
            else if(value>=350 && value<500){
                colors = colorsTypes.good
            }
            else if(value<350){
                colors = colorsTypes.medium
            }
            
        break;
        case "_0_100":      
            if(value<=3.7){
                colors = colorsTypes.great       
            }
            else if(value>=3.7 && value<5){
                colors = colorsTypes.veryGood
            }
            else if(value>=5 && value<6.5){
                colors = colorsTypes.good
            }
            else if(value>6.5){
                colors = colorsTypes.medium
            }
        break;
        case "_100_200":      
            if(value<=5.7){
                colors = colorsTypes.great       
            }
            else if(value>=5.7 && value<8){
                colors = colorsTypes.veryGood
            }
            else if(value>=8 && value<11.5){
                colors = colorsTypes.good
            }
            else if(value>11.5){
                colors = colorsTypes.medium
            }
        break;
    }
    return colors
}