// App.js
import React from "react";
import "./App.css"; // Import your CSS file
import ScientificCalculator from "./Components/ScientificCalculator"; // Import the calculator component

function App() {
  return (
    <div className="App">
      <h1>Scientific Calculator</h1>
      <p>
        Design and Coded By: <span>Mujahid Hussain</span>
      </p>
      <ScientificCalculator />
    </div>
  );
}

export default App;
