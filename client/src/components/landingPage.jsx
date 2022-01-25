import React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import "./landing.css";
import PokeLogo from "../assets/img/pokeLogo.png";
import PokeTodos from "../assets/img/pokeTodos.png";

export default function LandingPage() {
  return (
    <Fragment>
      <div>

        <div className="title-container">
          <img className="poke-landing" src={PokeLogo} alt="Not found" />
          <img className="poke-todos" src={PokeTodos} alt="Not found" />
        </div>

        <div className="landing-enter">
          <Link to="/home">
            <button className="btn-landing">Enter</button>
          </Link>
        </div>

        <div className="entri-container">
          
        </div>

      </div>
    </Fragment>
  );
}
