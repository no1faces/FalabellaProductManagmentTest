import { getAllProducts } from "@/api";
import { AddProduct } from "./components/AddProduct";
import { ProductList } from "./components/ProductList";

export default async function Home() {
	const products = await getAllProducts();
	return (
		<main className="max-w-full mx-auto mt-4">
			<div className="text-center my-5 flex flex-col gap-4">
				<h1 className="text-2xl font-bold">Falabella Products Managment</h1>
				<AddProduct/>
			</div>
			<ProductList products={products}/>
		</main>
	)
}
