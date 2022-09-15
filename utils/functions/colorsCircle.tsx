export const getColorsCircle = (value:number, type:string) => {
    let colors:string[] = ["gray", "lightgray"]
    switch (type) {
        case "hp":
            if(value>=600){
                colors = ["#f34", "#baa", "#a33", "#811"]
            }
            else if(value>=400 && value<600){
                colors = ["#ff7002", "#aa4002", "#855", "#715"]
            }
            else if(value>=250 && value<400){
                colors = ["#fad006", "#e9a004", "#c9a235", "#97a015"]
            }
            else if(value<250){
                colors = ["#11f569", "#06c851", "#258d4d", "#088538"]
            }
        break;
        case "nm":
            if(value>=700){
                colors = ["#f34", "#baa", "#a33", "#811"]
            }
            else if(value>=500 && value<700){
                colors = ["#ff7002", "#aa4002", "#855", "#715"]
            }
            else if(value>=350 && value<500){
                colors = ["#fad006", "#e9a004", "#c9a235", "#97a015"]
            }
            else if(value<350){
                colors = ["#11f569", "#06c851", "#258d4d", "#088538"]
            }
            
        break;
        case "acceleration":      
            if(value<=3.7){
                colors = ["#f34", "#baa", "#a33", "#811"]
            }
            else if(value>=3.7 && value<5){
                colors = ["#ff7002", "#aa4002", "#a93001", "#855"]
            }
            else if(value>=5 && value<6.5){
                colors = ["#fad006", "#e9a004", "#c9a235", "#97a015"]
            }
            else if(value>6.5){
                colors = ["#11f569", "#06c851", "#258d4d", "#088538"]
            }
        break;
    
    }
    return colors
}