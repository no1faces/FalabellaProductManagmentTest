import { IProduct } from "./types/product";

const baseUrl = "http://localhost:8080";

export const getAllProducts = async (): Promise<IProduct[]> => {
    const res = await fetch(`${baseUrl}/products`,{cache: 'no-store'});
    const products = await res.json();
    return products;
}

export const addProduct = async (product: IProduct): Promise<IProduct> => {
    const res = await fetch(`${baseUrl}/products`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    const newProduct = await res.json();
    return newProduct;
}

export const editProduct = async (sku: string, product: IProduct): Promise<IProduct> => {
    const res = await fetch(`${baseUrl}/product?sku=${sku}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    const editedProduct = await res.json();
    return editedProduct;
}