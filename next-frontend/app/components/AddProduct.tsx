"use client"
import {AiOutlinePlus} from "react-icons/ai"
import Modal from "./Modal"
import { FormEventHandler, useState } from "react"
import InputText from "./Commons/InputText"
import { addProduct } from "@/api"
import { useRouter } from "next/navigation"

export const AddProduct = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [sku, setSku] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [brand, setBrand] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [size, setSize] = useState<string>("");
    const [principalImage, setPrincipalImage] = useState<string>("");

    const handleCloseModal = () => {
        setSku("");
        setName("");
        setBrand("");
        setPrice("");
        setSize("");
        setPrincipalImage("");
        setModalOpen(false);

    }

    const handleSubmitNewProduct: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await addProduct({
            sku: sku, 
            name: name,
            brand: brand,
            price: parseInt(price),
            size: size,
            principalImage: principalImage,
            otherImages: []
        });
        setSku("");
        setName("");
        setBrand("");
        setPrice("");
        setSize("");
        setPrincipalImage("");
        setModalOpen(false);
        router.refresh();
    }

    return (
        <div>
            <button className="btn btn-primary w-full" onClick={() => setModalOpen(true)}>
                Add new product <AiOutlinePlus size={18}/>
            </button>
            <Modal modalOpen={modalOpen} handleCloseModal={handleCloseModal}>
                <form onSubmit={handleSubmitNewProduct}>
                    <h3 className="font-bold text-lg">Add new product</h3>
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
        </div>
    )
}
