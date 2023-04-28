import React, { useState } from 'react'
import { db } from '../firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'
// import firebase from '../firebase'

export const Transactions = ({ theme }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [transactions, setTransactions] = useState([])
  const [total, setTotal] = useState(0)

  const postCollectionRef = collection(db, 'transactions')

  const handleChange = (e) => {
    setDate(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const q = query(postCollectionRef, where('date', '==', date))
    const querySnapshot = await getDocs(q)
    // console.log(querySnapshot)
    let transactionsList = []
    let totalAmount = 0
    querySnapshot.forEach((doc) => {
      const transaction = {
        id: doc.id,
        date: doc.data().date,
        time: doc.data().time,
        amount: doc.data().amount,
        message: doc.data().message,
      }
      transactionsList.push(transaction)
      totalAmount += Number(transaction.amount)
    })
    console.log(transactionsList)
    setTransactions(transactionsList)
    setTotal(totalAmount.toFixed(2))
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="text-white text-3xl font-bold mb-8">Fetch Transactions</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="date" className="text-white font-bold mb-2">
          Enter Date :
        </label>
        <input
          type="date"
          id="date"
          name="date"
          max={new Date().toISOString().split('T')[0]}
          value={date}
          onChange={handleChange}
          required
          className={`appearance-none border-2 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500 bg-${
            theme === 'dark' ? 'gray-800' : 'gray-300'
          }`}
        />
        <button
          type="submit"
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline ${
            theme === 'dark' ? 'shadow-md' : ''
          }`}
        >
          Fetch Transactions
        </button>
      </form>
      {transactions.length > 0 ? (
        <div className="w-full mt-8 p-10">
          <h2 className="text-white text-xl font-bold mb-4">
            Transactions for {transactions[0].date}
          </h2>
          <p className="text-white font-bold mb-4">
            Total Amount Spent : ₹{total}
          </p>
          <table className="table-auto w-ful">
            <thead>
              <tr>
                <th className="px-4 py-2 text-white">Date</th>
                <th className="px-4 py-2 text-white">Message</th>
                <th className="px-4 py-2 text-white">Time</th>
                <th className="px-4 py-2 text-white">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="border px-4 py-2 text-white">
                    {transaction.date}
                  </td>
                  <td className="border px-4 py-2 text-white">
                    {transaction.message}
                  </td>
                  <td className="border px-4 py-2 text-white">
                    {transaction.time}
                  </td>
                  <td className="border px-4 py-2 text-white">
                    {transaction.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-red-700 mt-10">No records fetched.</div>
      )}
    </div>
  )
}
