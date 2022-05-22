import React, { useEffect, useState } from "react"
import "./navbar.css"

const Navbar = ({ data, fn }: any) => {
    const [type, setType] = useState(data[1])

    useEffect(() => fn(type), [])
    useEffect(() => fn(type), [type])

    return (
        <div className="navbar">
            <img
                className="icon icon-automobile"
                src={data[1]?.image}
                alt={data[1]?.name}
                onClick={() => setType(data[1])}
            />
            <img
                className="icon icon-house"
                src={data[2]?.image}
                alt={data[2]?.name}
                onClick={() => setType(data[2])}
            />
            <img
                className="icon icon-cash"
                src={data[0]?.image}
                alt={data[0]?.name}
                onClick={() => setType(data[0])}
            />
        </div>
    )
}

export default Navbar
