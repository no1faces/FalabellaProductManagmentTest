import { IProduct } from "@/types/product"
import { ProductBox } from "./ProductBox"

interface ProductListProps {
    products: IProduct[]
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid gap-x-4 gap-y-10 grid-cols-4">
        {products.map( product => (
            <ProductBox
                key={product.sku}
                product={product}
            />
        ))}
    </div>
  )
}
