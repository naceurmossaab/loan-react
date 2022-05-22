import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import "./index.css"
const products = require("../build/public/products.json")

import Navbar from "@components/navbar/"
import AmountCalculator from "@components/amountCalculator/"

const App = ({ data }: any) => {
    const [loanType, setLoanType] = useState(data[1])

    return (
        <div className="app">
            <div className="title">
                Let's plan your <span>loan</span>
            </div>
            <div className="card">
                <Navbar data={data} fn={setLoanType} />
                <AmountCalculator loan={loanType} />
            </div>
        </div>
    )
}

ReactDOM.render(<App data={products} />, document.getElementById("root"))
