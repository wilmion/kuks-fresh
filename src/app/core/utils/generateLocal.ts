
export const writeLocalStorage = ( key:string , value:any ):any => {
    const data:string = JSON.stringify(value);
    localStorage.setItem( key , data );
    return data;
}

export const getItemLocalStorage = (key:string):string | null => {
    const data:string | null = localStorage.getItem( key );
    return data;
}

export const cleanItemStorage = (key:string) => {
    localStorage.removeItem(key);
}