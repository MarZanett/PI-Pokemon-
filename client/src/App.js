import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Home from "./components/home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
    <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
