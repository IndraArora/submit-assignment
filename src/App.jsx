import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherApp from "./WeatherApp";
import Any from "./Any";

const App = () => {
  return (
    
      <Routes>
        <Route path="/weather/:ci" element={<WeatherApp />} />
        <Route path="/" element={<WeatherApp />} />
      </Routes>
    
  );
};

export default App;