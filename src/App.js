import './App.css';
import { useState } from 'react';

function App() {
  const [result, setResult] = useState('0');
  const[clearResult, setClearResult] = useState(false);

  const handlePrint = (e) => {
    const char = e.target.value;
    
    if (clearResult === true) {
      setResult('0');
      setClearResult(false);
    }
    
    if(0 <=parseInt(char) && parseInt(char) <= 9){

      setResult((prevResult) => {
        if(prevResult === '0'){
          return char;
        }
        return prevResult += char;
      });
    }

    else if(char === '+' || char === '-' || char === '*' || char === '/'){
      setResult((prevResult) => {
        if(prevResult !== '0' && 
          0 <= parseInt(prevResult[prevResult.length - 1]) && 
          parseInt(prevResult[prevResult.length - 1]) <= 9){
            return prevResult += char;
          }
        return prevResult;
      });
    }
  }

  const handleCalculate = (() => {
    var numbers = result.split(/[*+/-]/).map(Number);
    var operations = result.split(/[0-9]/).filter((char) => (char !== ''));

    let i = 0;
    while(i < operations.length){
      let number = 0;

      if(operations[i] === '*'){
         if((i + 1) < numbers.length){
            number = numbers[i] * numbers[i + 1];
            numbers.splice(i, 2);
         }

         else{
            number = parseFloat(numbers[i]);
            numbers.splice(i, 1);
         }

         numbers.splice(i, 0, number);
         operations.splice(i, 1);
      }
      else if(operations[i] === '/'){
        if((i + 1) < numbers.length){
           if(numbers[i + 1] === 0){
            alert('Cannot divide by 0');
            setResult(0);
            return 0;
           }
           number = parseFloat(numbers[i] / numbers[i + 1]);
           numbers.splice(i, 2);
        }

        else{
           number = parseFloat(numbers[i]);
           numbers.splice(i, 1);
        }

        numbers.splice(i, 0, number);
        operations.splice(i, 1);
      }
      else{
        i += 1;
      }
    }
    i = 0;

    while(i < operations.length){
      let number = 0;

      if(operations[i] === '+'){
         if((i + 1) < numbers.length){
            number = numbers[i] + numbers[i + 1];
            numbers.splice(i, 2);
         }

         else{
            number = parseFloat(numbers[i]);
            numbers.splice(i, 1);
         }

         numbers.splice(i, 0, number);
         operations.splice(i, 1);
      }
      else if(operations[i] === '-'){
        if((i + 1) < numbers.length){
           number = parseFloat(numbers[i] - numbers[i + 1]);
           numbers.splice(i, 2);
        }

        else{
           number = parseFloat(numbers[i]);
           numbers.splice(i, 1);
        }

        numbers.splice(i, 0, number);
        operations.splice(i, 1);
      }
      else{
        i += 1;
      }
    }
    setResult(numbers[0].toString());
    setClearResult(true);
  });

  const handleClear = () => {
    setResult('0');
  }

  const handleDelete = () => {
    setResult((prevResult) => {
      if(result !== '0'){
        if(result.length === 1){
          return '0';
        }
        else{
          return prevResult.slice(0, -1);
        }
      }
      else{
        return '0';
      }
    })
  }
  return (
    <div className = "container">
        <textarea disabled value = {result} maxLength = "18"></textarea>
        <div className = "buttonset">
          <button className = "button">MC</button>
          <button className = "button">M+</button>
          <button className = "button">M-</button>
          <button className = "button">MR</button> 

          <button className = "button operation" onClick={handleClear}>C</button>
          <button className = "button operation" value = '/' onClick={handlePrint}>/</button>
          <button className = "button operation" value = '*' onClick={handlePrint}>X</button>
          <button className = "button operation" onClick={handleDelete}>␡</button>
           
          <button className = "button" value = '7' onClick={handlePrint}>7</button>
          <button className = "button" value = '8' onClick={handlePrint}>8</button>
          <button className = "button" value = '9' onClick={handlePrint}>9</button>
          <button className = "button operation" value = '-' onClick={handlePrint}>-</button> 

          <button className = "button" value = '4' onClick={handlePrint}>4</button>
          <button className = "button" value = '5' onClick={handlePrint}>5</button>
          <button className = "button" value = '6' onClick={handlePrint}>6</button>
          <button className = "button operation" value = '+' onClick={handlePrint}>+</button>
          
          <div className = "col">
            <button className = "button" value = '1' onClick={handlePrint}>1</button>
            <button className = "button">%</button>
          </div>
          <div className = "col">
            <button className = "button" value = '2' onClick={handlePrint}>2</button>
            <button className = "button" value = '0' onClick={handlePrint}>0</button>
          </div>
          <div className = "col">
            <button className = "button" value = '3' onClick={handlePrint}>3</button>
            <button className = "button">.</button>
          </div>
          <div className = "col">
            <button className = "equal" onClick = {handleCalculate}>=</button>
          </div>
        </div>
    </div>
  );
}

export default App;
