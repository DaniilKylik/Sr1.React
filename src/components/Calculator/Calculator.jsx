import React, { useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);

  const handleClick = (value) => {
    if (value === 'e') {
      setInput(input + Math.E.toFixed(4));
    } else if (value === '%') {
      setInput(input + '%');
    } else if (value === '√') {
      setInput(input + '√');
    } else {
      setInput(input + value);
    }
  };

  const calculateResult = () => {
    try {
      let expression = input;

      // Обробка квадратного кореня з підтримкою виразів у дужках і множників перед коренем
      expression = expression.replace(/(\d*)√\(([^()]+)\)/g, (match, multiplier, inside) => {
        const baseValue = eval(inside); // Обчислення виразу всередині дужок
        const sqrtResult = Math.sqrt(baseValue);
        return multiplier ? parseFloat(multiplier) * sqrtResult : sqrtResult;
      });

      // Обробка квадратного кореня без дужок (простий випадок)
      expression = expression.replace(/(\d*)√(\d+(\.\d+)?)/g, (match, multiplier, number) => {
        const sqrtResult = Math.sqrt(parseFloat(number));
        return multiplier ? parseFloat(multiplier) * sqrtResult : sqrtResult;
      });

      // Обробка відсотків для виразів типу 50-5%
      expression = expression.replace(/(\d+(\.\d+)?)([+\-*/])(\d+(\.\d+)?%)/g, (match, base, _, operator, percent) => {
        const baseValue = parseFloat(base);
        const percentValue = parseFloat(percent) / 100;

        switch (operator) {
          case '+':
            return baseValue + baseValue * percentValue;
          case '-':
            return baseValue - baseValue * percentValue;
          case '*':
            return baseValue * percentValue;
          case '/':
            return baseValue / percentValue;
          default:
            return match;
        }
      });

      const evaluatedResult = eval(expression);
      setResult(evaluatedResult);
      setInput(String(evaluatedResult));
    } catch {
      setResult("Error");
    }
  };

  const clearInput = () => {
    setInput('');
    setResult(0);
  };

  return (
    <Container className="calculator">
      <Row className="display">
        <div>
          <div className="input">{input || "0"}</div>
          <div className="result">{result}</div>
        </div>
      </Row>
      <div className="buttonGrid">
        <div className="buttonRow">
          <Button variant="light" className="button button-number" onClick={() => handleClick('7')}>7</Button>
          <Button variant="light" className="button button-number" onClick={() => handleClick('8')}>8</Button>
          <Button variant="light" className="button button-number" onClick={() => handleClick('9')}>9</Button>
        </div>
        
        <div className="buttonRow">
          <Button variant="light" className="button button-number" onClick={() => handleClick('4')}>4</Button>
          <Button variant="light" className="button button-number" onClick={() => handleClick('5')}>5</Button>
          <Button variant="light" className="button button-number" onClick={() => handleClick('6')}>6</Button>
        </div>
        
        <div className="buttonRow">
          <Button variant="light" className="button button-number" onClick={() => handleClick('1')}>1</Button>
          <Button variant="light" className="button button-number" onClick={() => handleClick('2')}>2</Button>
          <Button variant="light" className="button button-number" onClick={() => handleClick('3')}>3</Button>
        </div>

        <div className="buttonRow">
          <Button variant="light" className="button button-number" onClick={() => handleClick('0')}>0</Button>
          <Button variant="light" className="button button-number" onClick={() => handleClick('.')}>.</Button>
          <Button variant="light" className="button button-number" onClick={() => handleClick('e')}>e</Button>
        </div>

        <div className="buttonRow">
          <Button variant="secondary" className="button button-operator" onClick={() => handleClick('+')}>+</Button>
          <Button variant="secondary" className="button button-operator" onClick={() => handleClick('-')}>-</Button>
          <Button variant="secondary" className="button button-operator" onClick={() => handleClick('*')}>*</Button>
        </div>

        <div className="buttonRow">
          <Button variant="secondary" className="button button-operator" onClick={() => handleClick('/')}>/</Button>
          <Button variant="secondary" className="button button-operator" onClick={() => handleClick('%')}>%</Button>
          <Button variant="secondary" className="button button-operator" onClick={() => handleClick('(')}>(</Button>
        </div>

        <div className="buttonRow">
          <Button variant="secondary" className="button button-operator" onClick={() => handleClick(')')}>)</Button>
          <Button variant="secondary" className="button button-operator" onClick={() => handleClick('√')}>√</Button>
          <Button variant="secondary" className="button button-operator" onClick={() => handleClick('**2')}>x²</Button>
        </div>

        <div className="buttonRow">
          <Button variant="danger" className="button button-clear" onClick={clearInput}>Clear</Button>
          <Button variant="primary" className="button button-equals" onClick={calculateResult}>=</Button>
        </div>
      </div>
    </Container>
  );
};

export default Calculator;
