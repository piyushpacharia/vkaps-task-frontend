import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../redux/productsSlice'
import { BASE_URL, role, token } from '../../Server'
import { FaEdit, FaTrash } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import UpdateProduct from './UpdateProduct'
import { Link } from 'react-router-dom'

export default function Products() {
    const allProducts = useSelector((state) => state.allProducts.products)
    const dispatch = useDispatch()
    const deleteProduct = async (productId) => {
        alert("Are You sure want to delete this ?")
        try {
            const response = await axios.delete(`${BASE_URL}/products/delete-product/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                toast.success(response.data.message)
                dispatch(fetchAllProducts())
            }
        } catch (error) {
            toast.error(error.response.data.message)

        }
    }
    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [])
    return (
        <div>
            <div className='flex flex-wrap gap-10 justify-center font-semibold'>
                {allProducts.map((item, index) => (
                    <div key={index} className='bg-gray-100 hover:bg-gray-50 p-5 rounded-lg relative'>
                        <img src={`${BASE_URL}/uploads/productImage/${item.productImage}`} alt="" className="w-[200px] h-[200px]" />
                        <div className="flex flex-col gap-2 justify-between">
                            {token && role === "admin" ? (<p className=' text-center underline'>In Stock : {item.inStock}</p>) : ("")}
                            <p className='capitalize'>{item.name}</p>
                            <p className='text-green-500'>{item.price}</p>
                        </div>
                        <Link to={`/product-details/${item._id}`} className='text-center text-blue-500'>
                            More Details
                        </Link>
                        {token && role === "admin" ? (
                            <div className='absolute top-2 right-2 flex gap-2'>
                                <UpdateProduct productData={item} />
                                <button onClick={(e) => { deleteProduct(item._id); e.preventDefault() }} className=' bg-gray-200 p-2 hover:bg-gray-300 rounded-lg'><FaTrash className='text-red-500' />
                                </button>
                            </div>
                        ) : ("")}
                    </div>
                ))}
            </div>
        </div>
    )
}
