import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL, token } from '../../Server'
import toast from 'react-hot-toast'

export default function ProductDetsils() {
    const params = useParams()
    const [productData, setProductData] = useState({})
    const fetchProductsById = async (productId) => {
        try {
            const response = await axios.get(`${BASE_URL}/products/fetch-product/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                setProductData(response.data.product)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
        fetchProductsById(params.productId)
    }, [])
    return (
        <div className='md:p-20 pt-20'>
            <div className='bg-gray-200 flex flex-col md:flex-row gap-5'>
                <div className="w-full">
                    <img src={`${BASE_URL}/uploads/productImage/${productData.productImage}`} alt="" />
                </div>
                <div className="w-full py-5">
                    <h2 className='text-2xl font-bold capitalize '>Name : <span className='font-semibold'>{productData.name}</span></h2>
                    <h2 className='text-2xl font-bold capitalize '>category : <span className='font-semibold'>{productData.category}</span></h2>
                    <h2 className='text-2xl font-bold capitalize '>Price : <span className='font-semibold text-green-500'>{productData.price}</span></h2>
                  <h1 className='my-5'>Specefications</h1>
                   <p className='bg-gray-50 md:m-5 p-5 rounded-lg'>{productData.description}</p>
                </div>
            </div>
        </div>
    )
}
