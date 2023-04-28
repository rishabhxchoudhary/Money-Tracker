import React, { useState } from 'react'
import { db } from '../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

function UpdateBalancePage() {
  const [balance, setBalance] = useState('')

  const postCollectionRef = collection(db, 'balance')

  const handleChange = (event) => {
    setBalance(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const d = new Date()
    await addDoc(postCollectionRef, {
      balance,
      date: d.toLocaleDateString(),
      time: d.toLocaleTimeString(),
    })
    setBalance(0)
  }

  return (
    <div className="container mx-auto mt-8 bg-black p-8 rounded-lg">
      <h1 className="text-2xl font-bold text-white mb-4">Update Balance</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="balance"
            className="block text-gray-300 font-bold mb-2"
          >
            Enter new balance:
          </label>
          <input
            type="number"
            id="balance"
            name="balance"
            value={balance}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="appearance-none border-2 rounded-lg py-2 px-4 text-gray-300 focus:text-black leading-tight focus:outline-none focus:bg-white focus:border-green-500 bg-gray-700"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Update Balance
        </button>
      </form>
    </div>
  )
}

export default UpdateBalancePage
