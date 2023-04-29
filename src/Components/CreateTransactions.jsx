import React, { useState } from 'react'
import { db } from '../firebaseConfig'
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
} from 'firebase/firestore'
// import firebase from 'firebase'

const MakeTransaction = () => {
  // State for transaction data
  const [transaction, setTransaction] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString(),
    amount: 0,
  })

  const [check, setCheck] = useState(true)
  const balCollectionRef = collection(db, 'balance')
  const postCollectionRef = collection(db, 'transactions')

  const theme = 'dark'
  const handleSubmit = async (event) => {
    event.preventDefault()
    await addDoc(postCollectionRef, transaction) // Add the transaction to Firebase
    if (check) {
      const querySnapshorts2 = await getDocs(
        query(balCollectionRef, orderBy('date', 'desc')),
      )
      const querySnapshorts = await getDocs(
        query(
          balCollectionRef,
          orderBy('time', 'desc'),
          where('date', '==', querySnapshorts2.docs[0].data().date),
        ),
      )
      const balance =
        querySnapshorts.docs[0].data().balance - transaction.amount
      const d = new Date()
      await addDoc(balCollectionRef, {
        balance,
        date: d.toLocaleDateString(),
        time: d.toLocaleString('en-US', { hour12: false }).split(' ')[1],
      })
    }
    setTransaction({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      amount: 0,
      message: '',
    }) // Reset the form
    setCheck(true)
    alert('Transaction recorded!')
  }

  // Function to update the transaction state when the user types in the form fields
  const handleChange = (event) => {
    const { name, value } = event.target
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    // console.log(transaction)
  }

  return (
    <div
      className={`bg-${'black'} min-h-screen flex flex-col justify-center items-center`}
    >
      <h1 className="text-3xl font-bold text-white mb-4">Make a Transaction</h1>
      <form
        onSubmit={handleSubmit}
        className={`bg-${
          theme === 'dark' ? 'black' : 'gray-200'
        } rounded-lg p-8 flex flex-col justify-center items-center shadow-lg`}
      >
        <div className="mb-4">
          <label htmlFor="date" className="block text-white font-bold mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
            required
            className={`appearance-none border-2 rounded-lg py-2 px-4 text-white focus:text-gray-700 w-screen max-w-sm leading-tight focus:outline-none focus:bg-white focus:border-green-500 bg-${
              theme === 'dark' ? 'gray-800' : 'gray-300'
            }`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-white font-bold mb-2">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={transaction.time}
            onChange={handleChange}
            required
            className={`appearance-none border-2 rounded-lg py-2 px-4 text-white focus:text-gray-700 w-screen max-w-sm  leading-tight focus:outline-none focus:bg-white focus:border-green-500 bg-${
              theme === 'dark' ? 'gray-800' : 'gray-300'
            }`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-white font-bold mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            value={transaction.amount}
            onChange={handleChange}
            required
            className={`appearance-none border-2 rounded-lg py-2 px-4 text-white focus:text-gray-700 leading-tight w-screen max-w-sm  focus:outline-none focus:bg-white focus:border-green-500 bg-${
              theme === 'dark' ? 'gray-800' : 'gray-300'
            }`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-white font-bold mb-2">
            Message
          </label>
          <input
            type="text"
            id="message"
            name="message"
            value={transaction.message}
            onChange={handleChange}
            required
            className={`appearance-none border-2 rounded-lg py-2 px-4 text-white focus:text-gray-700 w-screen max-w-sm leading-tight focus:outline-none focus:bg-white focus:border-green-500 bg-${
              theme === 'dark' ? 'gray-800' : 'gray-300'
            }`}
            autoComplete="off"
          />
        </div>
        <div className="mb-4 flex flex-row-reverse items-center gap-2">
          <label htmlFor="update" className="block text-white font-bold mb-2">
            Update Balance
          </label>
          <input
            type="checkbox"
            id="update"
            checked={check}
            onChange={(e) => {
              setCheck(!check)
            }}
          />
        </div>
        <button
          type="submit"
          className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 transition duration-300 ease-in-out`}
        >
          Add Transaction
        </button>
      </form>
    </div>
  )
}

export default MakeTransaction
