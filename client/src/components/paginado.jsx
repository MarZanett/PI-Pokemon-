import React from "react";
import "./paginado.css";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];

  //calculo cantidad de paginas y pusheo el resultado
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="paginado-container">
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <div key={number}>
                <a className="paginado" onClick={() => paginado(number)}>
                  {number}
                </a>
              </div>
            );
          })}
      </ul>
    </nav>
  );
}
