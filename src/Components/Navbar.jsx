// import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// function Navbar() {
//   return (
//     <nav className="bg-gray-800 p-2 flex items-center justify-between">
//       <div className="flex items-center">
//         <Link to="/" className="text-white font-bold text-xl ml-4">
//           My Money Tracker
//         </Link>
//       </div>
//       <div className="block hidden">
//         <button className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white">
//           <svg
//             className="h-3 w-3 fill-current"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <title>Menu</title>
//             <path
//               d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
//               fillRule="evenodd"
//             />
//           </svg>
//         </button>
//       </div>
//       <div className="block">
//         <div className="flex">
//           <Link
//             to="/"
//             className="text-white font-bold py-2 px-4 hover:bg-gray-700 rounded-lg"
//           >
//             Balance
//           </Link>
//           <Link
//             to="/new-transaction"
//             className="text-white font-bold py-2 px-4 hover:bg-gray-700 rounded-lg ml-4"
//           >
//             Make a Transaction
//           </Link>
// <Link
//   to="/transactions"
//   className="text-white font-bold py-2 px-4 hover:bg-gray-700 rounded-lg ml-4"
// >
//   Show Transactions
// </Link>
//           <Link
//             to="/update"
//             className="text-white font-bold py-2 px-4 hover:bg-gray-700 rounded-lg ml-4"
//           >
//             Update Balance
//           </Link>
//         </div>
//       </div>
//     </nav>
//   )
// }

import { useState } from 'react'

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false)

  function toggleDropdown() {
    setShowDropdown(!showDropdown)
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="text-white font-bold text-xl ml-4">
          My Money Tracker
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
          onClick={toggleDropdown}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block lg:flex lg:items-center lg:w-auto ${
          showDropdown ? 'block' : 'hidden'
        }`}
      >
        <div className="text-sm lg:flex-grow">
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4 text-white font-bold py-2 px-4 hover:bg-gray-700 rounded-lg"
          >
            Balance
          </Link>
          <Link
            to="/transactions"
            className="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4 text-white font-bold py-2 px-4 hover:bg-gray-700 rounded-lg"
          >
            Transactions
          </Link>
          <Link
            to="/new-transaction"
            className="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4 text-white font-bold py-2 px-4 hover:bg-gray-700 rounded-lg"
          >
            Create New Transaction
          </Link>
          <Link
            to="/update"
            className="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4 text-white font-bold py-2 px-4 hover:bg-gray-700 rounded-lg"
          >
            Update Balance
          </Link>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
