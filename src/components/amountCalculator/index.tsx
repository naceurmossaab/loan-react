import React, { useEffect, useState } from "react"
import "./amountCalculator.css"
import moment from "moment"

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

const AmountCalculator: React.FC<{ loan: Product }> = ({ loan }) => {
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
        setTotal(
            Number(loan?.min_amount) + (Number(loan?.min_amount) * Number(loan?.interest)) / 100
        )
    }, [loan])

    useEffect(() => {
        setTotal(Number(amount) + (Number(amount) * Number(loan?.interest)) / 100)
        setMonthlyAmount(Number(total) / Number(tenure))
        setDate(moment().add(tenure, "M").format("LL"))
    }, [amount, tenure, total])

    const formatNumber = (e: string) => {
        new Intl.NumberFormat("de-DE", { style: "currency", currency: "USD" }).format(Number(e))
    }

    return (
        <>
            <form className="flex flex-col sm:flex-row justify-around items-center mx-10">
                <div className="flex flex-col">
                    <label
                        className="font-medium text-sm leading-4 text-gray-900 mb-1 pl-4 sm:pl-0"
                        htmlFor="loan-amount">
                        loan amount
                    </label>
                    <div className="relative">
                        <span className="absolute text-gray-400 text-2xl top-3 left-5 sm:top-3 sm:left-3">
                            $
                        </span>
                        <input
                            className="w-[90vw] sm:w-[272px] h-[56px] border border-gray-200 pl-11 sm:pl-8 sm:w-auto rounded font-bold text-2xl leading-4 text-[#546e7a] outline-none"
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
                <div className="flex flex-col mt-4 sm:mt-0">
                    <label
                        className="font-medium text-sm leading-4 text-gray-900 mb-1 pl-4 sm:pl-0"
                        htmlFor="month-number">
                        number of months
                    </label>
                    <div className="number-input flex flex-row h-[56px] w-[90vw] sm:w-[192px] border border-gray-200 w-full rounded-lg relative mt-1 mx-5 sm:m-0 rounded outline-none min-w-90">
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                if (Number(tenure) > Number(loan?.min_tenure))
                                    setTenure(Number(tenure) - 1 + "")
                            }}
                            data-action="decrement"
                            className={`text-gray-600 hover:text-gray-700 hover:bg-gray-100 h-full w-20 sm:w-10 rounded-l cursor-pointer outline-none
                                        ${
                                            Number(tenure) <= Number(loan?.min_tenure)
                                                ? `cursor-not-allowed`
                                                : ``
                                        } `}>
                            <span className="m-auto text-2xl font-thin">&lt;</span>
                        </button>
                        <input
                            type="number"
                            className="not-italic font-normal text-lg leading-4 text-center text-gray-600 m-auto outline-none"
                            name="custom-input-number"
                            min={loan?.min_tenure}
                            max={loan?.max_tenure}
                            value={tenure}
                            onChange={(e) => setTenure(e.target.value)}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                if (Number(tenure) < Number(loan?.max_tenure))
                                    setTenure(Number(tenure) + 1 + "")
                            }}
                            data-action="increment"
                            className={`text-gray-600 hover:text-gray-700 hover:bg-gray-100 h-full w-20 sm:w-10 rounded-r cursor-pointer
                                        ${
                                            Number(tenure) >= Number(loan?.max_tenure)
                                                ? `cursor-not-allowed`
                                                : ``
                                        } `}>
                            <span className="m-auto text-2xl font-thin">&gt;</span>
                        </button>
                    </div>
                </div>
            </form>

            <div className="result flex flex-col my-6 mx-5 w-auto sm:w-[475px] sm:mx-12 border boder-gray-200">
                <div className="flex justify-between items-center p-6 p-8">
                    <span className="font-semibold text-xl leading-4 text-gray-900">
                        Monthly amount
                    </span>
                    <span className="font-bold text-3xl leading-4 text-blue-600">
                        ${monthly_amount.toFixed(2)}
                    </span>
                </div>
                <div className="bg-gray-100">
                    <p className="font-normal text-xs leading-4 text-gray-900 my-6 mx-8 text-center sm:text-justify">
                        You're planning <span className="font-bold"> monthly deposits </span>
                        to reach your <span className="font-bold">${amount}</span> goal by
                        <span className="font-bold"> {date}.</span> The total amount loaned will be
                        <span className="font-bold"> ${total.toFixed(2)}</span>
                    </p>
                </div>
            </div>

            <div className="flex justify-center items-center mx-32 mb-10">
                <button className="button bg-indigo-800 h-[56px] w-[85%] sm:w-[320px] font-semibold text-base leading-5 text-center text-white rounded-3xl">
                    Apply Now
                </button>
            </div>
        </>
    )
}

export default AmountCalculator
