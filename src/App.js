import { Route, Routes } from 'react-router-dom';
import './App.css';
import MakeTransaction from './Components/CreateTransactions';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { Transactions } from './Components/Transactions';
import UpdateBalance from './Components/UpdateBalance';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update" element={<UpdateBalance />} />
        <Route path="/new-transaction" element={<MakeTransaction />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </div>
  );
}

export default App;
