import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Header() {

    const navigate = useNavigate()
    const location = useLocation()

    const navItems = [
        {
            name: "All Todos",
            slug: "/",
            active: true,
        },
        {
            name: "Create New",
            slug: "/create-new",
            active: true,
        },
        {
            name: "Done",
            slug: "/done",
            active: true,
        },
    ]

    return (
        <>
        <div className="w-full bg-gray-100 p-3">
            <ul className='flex items-center w-full'>
                {navItems.map((item) =>
                    item.active ? (
                        <li key={item.name} className='mr-3'>
                        <button
                            onClick={() => navigate(item.slug)}
                            className={`cursor-pointer hover:bg-blue-500 hover:text-white px-3 py-2 transition-all rounded-md font-bold 
                                ${location.pathname === item.slug ? 'bg-blue-500 text-white' : 'bg-white'}
                            `}>
                            {item.name}
                        </button>
                        </li>
                    ) : null
                )}
            </ul>
        </div>
        </>
    )
}

export default Header
