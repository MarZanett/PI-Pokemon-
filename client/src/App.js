import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Home from "./components/home";
import PokemonCreate from "./components/pokemonCreated";
//import PokemonDetail from "./components/pokemonDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
    <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/pokemons" element={<PokemonCreate />} />
        {/* <Route exact path="/home/:id" element={<PokemonDetail />} /> */}
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
