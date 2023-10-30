import { IProduct } from "@/types/product"

interface ProductBoxProps {
    product: IProduct
}

export const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
  return (
    <div className="flex justify-center">
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure className="h-96">
                <img src={product.principalImage} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.brand}    |    Size: {product.size}</p>
                <p>${product.price}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    </div>
  )
}
