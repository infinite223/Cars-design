export const validInpute = (value1:string, theme:any, performance:string | undefined, focus:boolean, defBorderColor?:string) => {
    let borderColor = defBorderColor?defBorderColor:theme.backgroundContent
    if(value1.length>0){
        if(performance==='hp' || performance==='nm') {
            const validatePowerAndTorque =  parseFloat(value1) >= 10 && parseFloat(value1) < 10000

            borderColor = !validatePowerAndTorque?'rgba(200, 10, 10, .5)':focus?'#253':'rgba(200, 200, 200, .3)'
        }
        else if (performance==="_0_100" || performance==="_100_200") {
            const validateAcceleration = parseFloat(value1) >= .5 && parseFloat(value1) <100

            borderColor = !validateAcceleration?'rgba(200, 10, 10, .5)':focus?'#253':'rgba(200, 200, 200, .3)'
        }
    }
 
    return borderColor
}