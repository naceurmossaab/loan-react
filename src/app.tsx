import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import "./index.css"
const products = require("../build/public/products.json")

import Navbar from "@components/navbar/"
import AmountCalculator from "@components/amountCalculator/"

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

const App: React.FC<{ data: Array<Product> }> = ({ data }) => {
    const [loanType, setLoanType] = useState(data[1])

    return (
        <div className="flex flex-col justify-center items-center mb-12 sm:mb-5">
            <div className="text-center my-8 mx-0 text-xl leading-6 font-normal text-indigo-800">
                Let's plan your <span className="font-bold">loan</span>
            </div>
            <div className="bg-white rounded-lg mx-5 max-w-[100%] shadow-lg">
                <Navbar data={data} fn={setLoanType} />
                <AmountCalculator loan={loanType} />
            </div>
        </div>
    )
}

ReactDOM.render(<App data={products} />, document.getElementById("root"))
