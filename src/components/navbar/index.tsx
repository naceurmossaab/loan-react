import React, { useEffect, useState } from "react"
import "./navbar.css"

interface Product {
    id: string
    interest: string
    name: string
    min_amount: string
    max_amount: string
    min_tenure: string
    max_tenure: string
    image: string
}

const Navbar: React.FC<{ data: Array<Product>; fn: (arg0: Product) => void }> = ({ data, fn }) => {
    const [type, setType] = useState<Product>(data[1])

    useEffect(() => fn(type), [])
    useEffect(() => fn(type), [type])

    return (
        <div className="flex justify-between my-2 mx-24 sm:mx-40 ">
            <img
                className="cursor-pointer w-20 h-20"
                src={data[1]?.image}
                alt={data[1]?.name}
                onClick={() => setType(data[1])}
            />
            <img
                className="cursor-pointer mt-2 mr-1 w-16 h-16"
                src={data[2]?.image}
                alt={data[2]?.name}
                onClick={() => setType(data[2])}
            />
            <img
                className="cursor-pointer mt-2 w-16 h-16"
                src={data[0]?.image}
                alt={data[0]?.name}
                onClick={() => setType(data[0])}
            />
        </div>
    )
}

export default Navbar
