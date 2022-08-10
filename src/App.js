import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [depositAmount, setDepositAmount] = useState()
  const [interestRate, setInterestRate] = useState()
  const [termAmount, setTermAmount] = useState()
  const [frequency, setFrequency] = useState(12)
  const [maturity, setMaturity] = useState()

  const calculate = (e) => {
    if(errCheck())
      if (frequency === "maturity") {
        const result = depositAmount * (1 + ((interestRate/100)*termAmount))
        setMaturity(Math.round(result))
        
      } else {
        const result = depositAmount * Math.pow(1 + ((interestRate/100) / frequency), (frequency * termAmount))
        setMaturity(Math.round(result))
      }
    e.preventDefault()
  }


  const errCheck = () => {
    if(isNaN(depositAmount) || isNaN(interestRate) || isNaN(termAmount)){
      alert("All inputs must be numbers")
      return false
    } else {
      return true
    }
  }
  

  return (
    <div className="App">
      <form className="calc-form">
        <label>
          Start deposit amount: $
          <input type="number" placeholder="0" min="0" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
        </label>
        <label>
          Interest rate: %
          <input type="number" placeholder="0" step="0.1" min="0" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}/>
        </label>
        <label>
          Investment term: Years
          <input type="number" placeholder="0" min="0" value={termAmount} onChange={(e) => setTermAmount(e.target.value)}/>
        </label>
        <label>
          Interest paid:
          <select onChange={(e) => setFrequency(e.target.value)}>            
            <option value={12}>Monthly</option>
            <option value={4}>Quarterly</option>
            <option value={1}>Annually</option>
            <option value="maturity">At Maturity</option>
          </select>
        </label>
        <button onClick={calculate}>Calculate</button>
      </form>
      <br /><br />
      <h3>Your final balance will be: ${maturity} </h3>
    </div>
  );
}

export default App;
