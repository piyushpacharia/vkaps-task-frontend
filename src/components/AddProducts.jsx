import axios from 'axios'
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { BASE_URL, token } from '../../Server'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { fetchAllProducts } from '../redux/productsSlice'

export default function AddProducts() {
    const [isModelOpen, setIsModelOpen] = useState("")
    const [name, setName] = useState("")
    const [inStock, setInStock] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [productImage, setProductImage] = useState(null)
    const handleModelToggle = () => {
        setIsModelOpen(!isModelOpen)
    }

    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("inStock", inStock)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("productImage", productImage)
            const response = await axios.post(`${BASE_URL}/products/add-product/productImage`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                toast.success(response.data.message)
                handleModelToggle()
                dispatch(fetchAllProducts())
            }

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div >
            <div className='flex justify-end mb-5'>
                <button
                    data-modal-target="add-product-modal"
                    data-modal-toggle="add-product-modal"
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={handleModelToggle}
                >
                    Add Product
                </button>
            </div>
            {/* Main modal */}
            {isModelOpen ? (
                <div
                    id="add-product-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="flex bg-[#00000080] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full"
                >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Add Product
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="add-product-modal"
                                    onClick={handleModelToggle}
                                >
                                    <IoClose />
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-4 md:p-5 space-y-4">
                                <form className=" mx-auto" onSubmit={handleSubmit}>
                                    <div className="flex flex-col md:flex-row gap-5">
                                        <div className="mb-5 w-full">
                                            <label
                                                htmlFor="name"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Product Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                value={name}
                                                onChange={(e) => { setName(e.currentTarget.value) }}
                                                placeholder="Product Name"
                                                required
                                            />
                                        </div>
                                        <div className="mb-5 w-full">
                                            <label
                                                htmlFor="price"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Price
                                            </label>
                                            <input
                                                type="number"
                                                id="price"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                value={price}
                                                onChange={(e) => { setPrice(e.currentTarget.value) }}
                                                placeholder='Price'
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-5">
                                        <div className="mb-5 w-full">
                                            <label
                                                htmlFor="category"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Category
                                            </label>
                                            <input
                                                type="text"
                                                id="category"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Category"
                                                value={category}
                                                onChange={(e) => setCategory(e.currentTarget.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-5 w-full">
                                            <label
                                                htmlFor="inStock"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                In Stock
                                            </label>
                                            <input
                                                type="number"
                                                id="inStock"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                value={inStock}
                                                onChange={(e) => setInStock(e.currentTarget.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-5 w-full">
                                        <label
                                            htmlFor="description"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            type="text"
                                            id="description"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={description}
                                            onChange={(e) => setDescription(e.currentTarget.value)}
                                            required=""
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            htmlFor="user_avatar"
                                        >
                                            Upload file
                                        </label>
                                        <input
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            aria-describedby="user_avatar_help"
                                            id="user_avatar"
                                            type="file"
                                            onChange={(e) => setProductImage(e.target.files[0])}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                        <button
                                            type="submit"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            ) : ("")}
        </div>
    )
}
