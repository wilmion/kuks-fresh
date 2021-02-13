export const months:string[] = ['Jan' , 'Feb' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August', 'Sep' , 'Oct' , 'Nov' , 'Dic'];
export const days:string[] = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thrusday' , 'Friday' , 'Saturday'];
export const datesMonth:number[] = [31 , 28 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31];
export const getDay = (date:number , dayNumber:number):string => {
    const firstDayMonth:number = dayNumber;
    const day:number = (date%7)+(firstDayMonth - 1);
    
    return days[day];
}