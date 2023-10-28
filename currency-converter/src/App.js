import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState();
  const [convertedAmount, setConvertedAmount] = useState();


  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/105343266b4898e141bafe12/latest?base=${fromCurrency}&symbols=${toCurrency}', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setExchangeRate(data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className="input-container">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          {/* Agrega más monedas según tus necesidades */}
        </select>
      </div>
      <div className="equals">=</div>
      <div className="output-container">
        <input
          type="text"
          value={convertedAmount || ''}
          readOnly
        />
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="EUR">EUR</option>
          {/* Agrega más monedas según tus necesidades */}
        </select>
      </div>
    </div>
  );
}

export default App;