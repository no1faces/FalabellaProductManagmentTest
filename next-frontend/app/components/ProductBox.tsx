'use client'
import { IProduct } from "@/types/product"
import {BiEdit} from "react-icons/bi"
import {FiTrash2} from "react-icons/fi"
import Modal from "./Commons/Modal"
import { FormEventHandler, useState } from "react"
import InputText from "./Commons/InputText"
import { deleteProduct, editProduct } from "@/api"
import { useRouter } from "next/navigation"

interface ProductBoxProps {
    product: IProduct
}

export const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
    const router = useRouter();
    const [modalEditOpen, setModalEditOpen] = useState<boolean>(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);
    const [sku, setSku] = useState<string>(product.sku);
    const [name, setName] = useState<string>(product.name);
    const [brand, setBrand] = useState<string>(product.brand);
    const [price, setPrice] = useState<string>(String(product.price));
    const [size, setSize] = useState<string>(product.size);
    const [principalImage, setPrincipalImage] = useState<string>(product.principalImage);
    const [otherImages,] = useState<string[]>(product.otherImages)

    const handleCloseEditModal = () => {
        setSku(product.sku);
        setName(product.name);
        setBrand(product.brand);
        setPrice(String(product.price));
        setSize(product.size);
        setPrincipalImage(product.principalImage);
        setModalEditOpen(false);
    }

    const handleCloseDeleteModal = () => {
        setModalDeleteOpen(false)
    }

    const handleSubmitEditProduct: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editProduct(product.sku,{
            sku: sku,
            name: name,
            brand: brand,
            price: parseInt(price),
            size: size,
            principalImage: principalImage,
            otherImages: otherImages
        });
        setModalEditOpen(false);
        router.refresh();
    }

    const handleDeleteProduct = async (delSku: string) => {
        await deleteProduct(delSku);
        setModalDeleteOpen(false);
        router.refresh();
    }

    return (
        <div className="flex justify-center">
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure className="h-96">
                    <img src={product.principalImage} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {product.name}
                    </h2>
                    <p>
                        {product.brand}    |    Size: {product.size}
                    </p>
                    <p>
                        ${product.price}
                    </p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-ghost" onClick={()=>setModalEditOpen(true)}>
                            <BiEdit className="text-blue-500" size={25}/>
                        </button>
                        <Modal modalOpen={modalEditOpen} handleCloseModal={handleCloseEditModal}>
                            <form onSubmit={handleSubmitEditProduct}>
                                <h3 className="font-bold text-lg">Edit product</h3>
                                <InputText label={"SKU: "} value={sku} setValue={setSku}/>
                                <InputText label={"Name: "} value={name} setValue={setName}/>
                                <InputText label={"Brand: "} value={brand} setValue={setBrand}/>
                                <InputText label={"Price: "} value={price} setValue={setPrice}/>
                                <InputText label={"Size: "} value={size} setValue={setSize}/>
                                <InputText label={"Principal Image: "} value={principalImage} setValue={setPrincipalImage}/>
                                <button type="submit" className="btn mt-2">
                                    Submit
                                </button>
                            </form>
                        </Modal>
                        <button className="btn btn-ghost" onClick={()=>setModalDeleteOpen(true)}>
                            <FiTrash2 className="text-red-500" size={25}/>
                        </button>
                        <Modal modalOpen={modalDeleteOpen} handleCloseModal={handleCloseDeleteModal}>
                            <h3 className="text-lg">
                                Are you sure, you want to delete this product?
                            </h3>
                            <div className="modal-action">
                                <button onClick={()=>handleDeleteProduct(product.sku)} className="btn">
                                    Yes
                                </button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
  )
}
