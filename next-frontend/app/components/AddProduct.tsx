"use client"
import {AiOutlinePlus} from "react-icons/ai"
import Modal from "./Modal"
import { useState } from "react"

export const AddProduct = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <div>
            <button className="btn btn-primary w-full" onClick={() => setModalOpen(true)}>
                Add new product <AiOutlinePlus size={18}/>
            </button>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form>
                    <h3 className="font-bold text-lg">Add new product</h3>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-bold">SKU:</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-bold">Name:</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-bold">Brand:</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-bold">Price:</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-bold">Size:</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-bold">Principal Image:</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                </form>
            </Modal>
        </div>
    )
}
