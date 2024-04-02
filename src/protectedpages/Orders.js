import React from 'react'
export default function Orders() {
    console.log(process.env.REACT_APP_BACKEND_URL)
    return (
        <div>
            Orders
            {process.env.REACT_APP_BACKEND_URL}
        </div>
    )
}
