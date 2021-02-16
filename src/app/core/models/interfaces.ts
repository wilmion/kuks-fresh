export interface IProduct {
    id:number,
    image: string,
    title: string,
    reviews: {
        five_start: number,
        for_start: number,
        three_start: number,
        two_start: number,
        one_start: number
    },
    prices: { cost: 45, moneda: '$' | '€'}[],
    from:string[],
    time_delivery: string,
    type: "lunch" | "drinks" | "breakFast" |"Desserts" | "fastFood",
    kitchen: string[],
    ingredients: string[],
    subtitle: string,
    diet_info: string[],
    dietary_restricion : string[],
    descriptions:{
        product: string,
        portion: string
    };
    dateItemAdded:IDateTime;
    itemSold:number;
}
export interface IControlSchedule {
    month:number,
    day:number,
    dates:number,
    fullMonth:string,
}
export interface IScheduleData {
    from: number,
    to: number,
    available:boolean,
    hourlyRate: number,
    totalHours: number,
    repeatWeekly: number,
    total: string,
    finished: boolean ,
    deliveryOff:number;
    date: IDateTime;
}
export interface IDateTime{
    year: number,
    day: string,
    date: number,
    month: string
}
export interface IUser {
    email:string;
    id:number;
    schedules:IScheduleData[]
}
export interface IScheduleConfigDay{
    day: string,
    from: number,
    to: number,
    deliveryOff: number,
    hourlyRate: number,
    repeatWeekly: number
}