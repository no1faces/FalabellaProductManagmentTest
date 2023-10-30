import { IProduct } from "./types/product";

const baseUrl = "http://localhost:8080";

export const getAllProducts = async (): Promise<IProduct[]> => {
    const res = await fetch(`${baseUrl}/products`);
    const products = await res.json();
    return products;
}