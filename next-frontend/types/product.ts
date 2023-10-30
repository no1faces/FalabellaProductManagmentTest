export interface IProduct {
    sku: string,
    name: string,
    brand: string,
    size: string,
    price: number,
    principalImage: string,
    otherImages: Array<string>
}