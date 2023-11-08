export const getMakes = async (setMakesCategory: (value:{key:number, value:string}[]) => void) => {
    await fetch('https://carapi.app/api/makes')
     .then((response) => response.json())
     .then((data:any) => 
         {
          let newArray = data.data.map((item:any) => {
              return {key: item.id, value: item.name}
          })
          setMakesCategory(newArray)
         }
     );     
}