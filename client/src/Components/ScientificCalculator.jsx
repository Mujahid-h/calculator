import React, { useState } from "react";
import axios from "axios";
import "./ScientificCalculator.css";

const ScientificCalculator = () => {
  const [expression, setExpression] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [equalPressed, setEqualPressed] = useState(false);

  const handleOnOffClick = () => {
    if (!isShiftPressed) {
      setExpression("");
      setResult("");
      setShowResult(false);
      setEqualPressed(false); // Clear the equalPressed state
    }

    if (isShiftPressed && isOn) {
      setIsOn(false);
      setIsShiftPressed(false);
    } else if (!isShiftPressed) {
      setExpression("");
    }

    if (!isOn) {
      setIsOn(true);
    }
  };

  const calculateExpression = async () => {
    try {
      if (isOn) {
        const response = await axios.post("/api/calculate", { expression });
        setResult(response.data.result);
        setShowResult(true);
        setEqualPressed(true); // Set equalPressed to true after calculation
      }
    } catch (error) {
      console.error("Error calculating expression:", error);
      setResult("Error");
    }
  };

  const handleButtonClick = (value) => {
    if (isOn) {
      if (value === "ALPHA" && isShiftPressed) {
        // Handle the ALPHA button when Shift is pressed
        // Add your logic here
      } else if (value === "C") {
        setExpression("");
        setResult("");
        setShowResult(false);
        setIsShiftPressed(false);
        setEqualPressed(false); // Clear the equalPressed state
      } else {
        if (showResult && value.match(/[0-9.()]/)) {
          setResult("");
          setShowResult(false);
          setEqualPressed(false); // Clear the equalPressed state
        }
        if (isShiftPressed) {
          setIsShiftPressed(false);
          return;
        }
        setExpression((prevExpression) => {
          if (equalPressed) {
            return value; // Set the input to the new key if "=" was pressed
          }
          return prevExpression + value;
        });
      }
    }
  };

  const handleShiftKeyDown = () => {
    setIsShiftPressed(!isShiftPressed);
  };

  const calculateSquare = () => {
    if (isOn) {
      const number = parseFloat(expression);
      if (!isNaN(number)) {
        const square = Math.pow(number, 2);
        setExpression(square.toString());
        setResult(square.toString());
        setShowResult(true);
        setEqualPressed(true); // Set equalPressed to true after calculation
      }
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder={
          isOn
            ? "Enter expression"
            : "Calculator is off" + (isShiftPressed ? " " : "")
        }
        value={isOn ? (showResult ? result : expression) : ""}
        onChange={(e) => {
          if (showResult) {
            setResult("");
            setShowResult(false);
            setEqualPressed(false); // Clear the equalPressed state
          }
          setExpression(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            calculateExpression();
          }
        }}
        disabled={!isOn}
      />

      <div className="btn-container">
        <div className="btn-div">
          <button
            onClick={handleOnOffClick}
            className={`on-off-button ${isOn ? "on" : "off"} ${
              isShiftPressed ? "shift-pressed" : ""
            }`}
          >
            {isOn ? "On" : "Off"}
          </button>
          <button
            onClick={handleShiftKeyDown}
            className={`shift-button ${isShiftPressed ? "on" : "off"}`}
          >
            Shift
          </button>

          <button onClick={() => handleButtonClick("(")}>(</button>
          <button onClick={() => handleButtonClick(")")}>)</button>
        </div>
        <div className="btn-div">
          <button onClick={() => handleButtonClick("sin(")}>sin</button>
          <button onClick={() => handleButtonClick("cos(")}>cos</button>
          <button onClick={() => handleButtonClick("tan(")}>tan</button>
          <button onClick={() => handleButtonClick("sqrt(")}>√</button>
        </div>
        <div className="btn-div">
          <button onClick={() => handleButtonClick("C")}>AC</button>
          <button onClick={calculateSquare}>x²</button>
          <button onClick={() => handleButtonClick("^")}>^</button>
          <button onClick={() => handleButtonClick("/")}>/</button>
        </div>
        <div className="btn-div">
          <button onClick={() => handleButtonClick("7")}>7</button>
          <button onClick={() => handleButtonClick("8")}>8</button>
          <button onClick={() => handleButtonClick("9")}>9</button>
          <button onClick={() => handleButtonClick("*")}>x</button>
        </div>
        <div className="btn-div">
          <button onClick={() => handleButtonClick("4")}>4</button>
          <button onClick={() => handleButtonClick("5")}>5</button>
          <button onClick={() => handleButtonClick("6")}>6</button>
          <button onClick={() => handleButtonClick("-")}>-</button>
        </div>
        <div className="btn-div">
          <button onClick={() => handleButtonClick("1")}>1</button>
          <button onClick={() => handleButtonClick("2")}>2</button>
          <button onClick={() => handleButtonClick("3")}>3</button>
          <button onClick={() => handleButtonClick("+")}>+</button>
        </div>
        <div className="btn-div">
          <button onClick={() => handleButtonClick(".")}>.</button>
          <button onClick={() => handleButtonClick("0")}>0</button>
          <button onClick={() => handleButtonClick("%")}>%</button>
          <button onClick={calculateExpression}>=</button>
        </div>{" "}
      </div>
    </div>
  );
};

export default ScientificCalculator;
