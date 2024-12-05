import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../../Server'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const signin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${BASE_URL}/auth/signin`, {
                email,
                password
            })
            if (response.data.success) { 
                toast.success(response.data.message)
                navigate("/")
                localStorage.setItem("vkapsAuth",response.data.token)
                localStorage.setItem("vkapsRole",response.data.role)
                
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='md:p-20 pt-20 h-[100vh] '>
            <div className='bg-gray-100 flex flex-col md:flex-row p-2 overflow-hidden justify-center items-center md:p-20 h-full'>
                <div>
                    <img src="https://st2.depositphotos.com/1734074/5704/v/450/depositphotos_57047295-stock-illustration-vector-flat-e-commerce-illustration.jpg" className='h-100%' alt="" />
                </div>
                <form className="max-w-sm mx-auto w-full" onSubmit={signin}>
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@flowbite.com"
                            required=""
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        SignIn
                    </button>
                </form>
            </div>

        </div>
    )
}
