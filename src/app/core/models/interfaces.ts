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
    }
}