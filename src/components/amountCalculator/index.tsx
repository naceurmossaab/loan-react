import React, { useEffect, useState } from "react"
import "./amountCalculator.css"
import moment from "moment"

const AmountCalculator = ({ loan }: any) => {
    const [amount, setAmount] = useState(loan?.min_amount)
    const [tenure, setTenure] = useState(loan?.min_tenure)
    const [date, setDate] = useState(moment().format("LL"))
    const [monthly_amount, setMonthlyAmount] = useState(
        Number(loan?.min_amount) / Number(loan?.min_tenure)
    )
    const [total, setTotal] = useState(
        Number(loan?.min_amount) + (Number(loan?.min_amount) * Number(loan?.interest)) / 100
    )

    useEffect(() => {
        setAmount(loan?.min_amount)
        setTenure(loan?.min_tenure)
    }, [loan])

    useEffect(() => {
        setMonthlyAmount(Number(total) / Number(tenure))
        setTotal(Number(amount) + (Number(amount) * Number(loan?.interest)) / 100)
        setDate(moment().add(tenure, "M").format("LL"))
    }, [amount, tenure])

    return (
        <>
            <form className="amount-form">
                <div className="input">
                    <label className="input-label" htmlFor="loan-amount">
                        loan amount
                    </label>
                    <div className="amount-input">
                        <span>$</span>
                        <input
                            type="number"
                            id="loan-amount"
                            name="loan-amount"
                            min={loan?.min_amount}
                            max={loan?.max_amount}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>
                <div className="custom-number-input input">
                    <label className="input-label" htmlFor="month-number">
                        number of months
                    </label>
                    <div className="number-input flex flex-row h-10 w-full rounded-lg relative mt-1">
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                if (Number(tenure) > Number(loan?.min_tenure))
                                    setTenure(Number(tenure) - 1 + "")
                            }}
                            data-action="decrement"
                            className={`text-gray-600 hover:text-gray-700 hover:bg-gray-100 h-full w-20 rounded-l cursor-pointer outline-none
                                        ${
                                            Number(tenure) <= Number(loan?.min_tenure)
                                                ? `disable`
                                                : ``
                                        } `}>
                            <span className="m-auto text-2xl font-thin">&lt;</span>
                        </button>
                        <input
                            type="number"
                            className="text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                            name="custom-input-number"
                            min={loan?.min_tenure}
                            max={loan?.max_tenure}
                            value={tenure}
                            onChange={(e) => setTenure(Number(e.target.value))}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                if (Number(tenure) < Number(loan?.max_tenure))
                                    setTenure(Number(tenure) + 1 + "")
                            }}
                            data-action="increment"
                            className={`text-gray-600 hover:text-gray-700 hover:bg-gray-100 h-full w-20 rounded-r cursor-pointer
                                        ${
                                            Number(tenure) >= Number(loan?.max_tenure)
                                                ? `disable`
                                                : ``
                                        } `}>
                            <span className="m-auto text-2xl font-thin">&gt;</span>
                        </button>
                    </div>
                </div>
            </form>
            {/* result container */}
            <div className="result">
                <div className="monthly-container">
                    <span className="monthly-amount">Months amount</span>
                    <span className="monthly-result">${monthly_amount.toFixed(2)}</span>
                </div>
                <div className="loan-details">
                    <p>
                        You're planning <span> monthly deposits </span>
                        to reach your <span>{amount}</span> goal by <br />
                        <span>{date}.</span> The total amount loaned will be
                        <span> $ {total.toFixed(2)}</span>
                    </p>
                </div>
            </div>

            <div className="apply-now">
                <button>Apply Now</button>
            </div>
        </>
    )
}

export default AmountCalculator
