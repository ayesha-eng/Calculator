import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

function App() {
  const [result, setResult] = useState('');

  const handleClick = (e) => {
    const clickedValue = e.target.name;
    if (clickedValue === "0" && result === "0" && !result.includes(".")) {
      return;
    } else if (result === "" && /[\+\-\*\/]/.test(clickedValue)) {
      return;
    }
    setResult(result.concat(clickedValue));
  };
  const clear = () => {
    setResult("");
  }

  const handleDelete = () => {
    setResult(result.slice(0, -1));
  }
 

  const persenClick = () => {
    const lastIndex = result.length - 1;
    const operatorIndex = result.search(/[\+\-\*\/]/);

    if (operatorIndex === -1) {
      // If there is no operator, calculate the percentage of the current number
      setResult(parseFloat(result) / 100);
    } else {
      // If there is an operator, calculate the percentage based on the previous and current numbers
      const prevNum = result.slice(0, operatorIndex);
      const currNum = result.slice(operatorIndex + 1, lastIndex + 1);

      if (!currNum) {
        // If the current number is empty, do nothing
        return;
      }

      const operator = result.charAt(operatorIndex);

      let percentage;

      switch (operator) {
        case '+':
          percentage = parseFloat(prevNum) + (parseFloat(currNum) * parseFloat(prevNum) / 100);
          break;
        case '-':
          percentage = parseFloat(prevNum) - (parseFloat(currNum) * parseFloat(prevNum) / 100);
          break;
        case '*':
          percentage = parseFloat(prevNum) * (parseFloat(currNum) / 100);
          break;
        case '/':
          percentage = parseFloat(prevNum) / (parseFloat(currNum) / 100);
          break;
        default:
          break;
      }

      setResult(percentage.toString());
    }
  }

  const calculate = () => {
    try {
      setResult(eval(result).toString());
    } catch {
      setResult("Error")
    }
  }


  return (
    <div className="App">
     <div className='container'>
     <FontAwesomeIcon icon={faBars} style={{ position: 'absolute',  left: '600', margin: '10px' , color: 'white' }} />
      
        <form>
          <input type="text" value={result} disabled  />
        </form>
             <div className='keypad'>
          <button  onClick={clear} id='clear'className='highlight'>C</button>
          <button onClick={handleDelete} className='highlight'>DEL</button>
          <button  onClick={persenClick} className='highlight'>%</button>
          <button name='/' onClick={handleClick} className='highlight'>&divide;</button>
          <button name="7" onClick={handleClick}>7</button>
          <button name="8" onClick={handleClick}>8</button>
          <button name="9" onClick={handleClick}>9</button>
          <button name="*" onClick={handleClick} className='highlight'>&times;</button>
          <button name="4" onClick={handleClick}>4</button>
          <button name="5" onClick={handleClick}>5</button>
          <button name="6" onClick={handleClick}>6</button>
          <button name="-" onClick={handleClick} className='highlight'>-</button>
          <button name="1" onClick={handleClick}>1</button>
          <button name="2" onClick={handleClick}>2</button>
          <button name="3" onClick={handleClick}>3</button>
          <button name="+" onClick={handleClick } className='highlight'>+</button>
          <button name="0" onClick={handleClick}>0</button>
          <button name="." onClick={handleClick}>.</button>
         <button onClick={calculate} id='equal' className='highlight'>=</button>
        </div>

      </div>

    </div>
  );
}

export default App;