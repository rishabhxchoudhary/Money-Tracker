import React, { useState } from 'react'
import { db } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
// import firebase from 'firebase'

const Home = () => {
  // State for current balance
  const postCollectionRef = collection(db, 'balance')
  const [balance, setBalance] = useState(0)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [balList, setBalList] = useState([])

  useState(async () => {
    const querySnapshorts = await getDocs(postCollectionRef)
    let list = []
    let list2 = []
    querySnapshorts.forEach((doc) => {
      list.push(doc.data())
      list2.push(
        <p className="text-white">{`${doc.data().date} at ${
          doc.data().time
        } - ₹${doc.data().balance}`}</p>,
      )
    })
    list.reverse()
    list2.reverse()
    setBalList(list2)
    setBalance(list[0].balance)
    setDate(list[0].date)
    setTime(list[0].time)
  }, [])

  return (
    <div
      className={`bg-black min-h-screen flex flex-col justify-center items-center`}
    >
      <h1 className="text-3xl font-bold text-white mb-4">Money Tracker App</h1>
      <div
        className={`rounded-lg p-8 flex flex-col justify-center items-center shadow-lg`}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Current Balance</h2>
        {Number(balance) > 2000 ? (
          <p className="text-4xl font-bold text-green-500 mb-8">₹{balance}</p>
        ) : (
          <p className="text-4xl font-bold text-red-500 mb-8">₹{balance}</p>
        )}
        <p className="text-white">
          Last Updated on {date} at {time}
        </p>
      </div>
      <p className="text-white text-xl">Logs:</p>
      {balList}
    </div>
  )
}

export default Home
