export const getCorrectNameLikes = (countLikes: number) => {
    let name = ''

    if(countLikes === 0) return 
    else if(countLikes === 1) return `${countLikes} Polubienie`
    else if(countLikes > 1) return `${countLikes} Polubień`
    else if(countLikes > 1000) return `${countLikes/1000}k polubień`
}