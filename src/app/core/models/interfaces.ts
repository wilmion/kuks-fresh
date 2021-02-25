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
    prices: { cost: number, moneda: '$' | '€'}[],
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
    id:number;
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
    pendding: boolean,
    location: ILocation,
    products: IProductsUser[];
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
    name: string,
    job: string,
    admin: boolean,
    image: string,
    schedules:IScheduleData[],
}
export interface IScheduleConfigDay{
    day: string,
    from: number,
    to: number,
    deliveryOff: number,
    hourlyRate: number,
    repeatWeekly: number
}

export interface IFormProductArrays {
    froms: IProductArrData;
    kitchens: IProductArrData;
    ingredients: IProductArrData;
    diets:IProductArrData;
    dietaryRestriction:IProductArrData;
}
interface IProductArrData {
    arr : (string | undefined)[];
    values: string[]
}
export interface ILocation {
    city: string,
    country: string,
    direction: string,
}
export interface IOrder extends IScheduleData{
    user_name: string;
}
export interface IProductsUser extends IProduct {
    amount: number
}