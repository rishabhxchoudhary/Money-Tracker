import React, { useState } from 'react'
import { db } from '../firebaseConfig'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

const Home = () => {
  const postCollectionRef = collection(db, 'balance')
  const [balance, setBalance] = useState(0)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [balList, setBalList] = useState([])

  useState(async () => {
    const querySnapshorts = await getDocs(
      query(postCollectionRef, orderBy('date', 'desc')),
    )
    let list = []
    querySnapshorts.forEach((doc) => {
      list.push(
        <p key={doc.id} className="text-white">{`${doc.data().date} at ${
          doc.data().time
        } - ₹${doc.data().balance}`}</p>,
      )
    })
    setBalList(list)
    const querySnapshorts2 = await getDocs(
      query(
        postCollectionRef,
        orderBy('time', 'desc'),
        where('date', '==', querySnapshorts.docs[0].data().date),
      ),
    )
    setBalance(querySnapshorts2.docs[0].data().balance)
    setDate(querySnapshorts2.docs[0].data().date)
    setTime(querySnapshorts2.docs[0].data().time)
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
