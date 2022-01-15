import React from "react";

export default function Paginado({pokemonsPerPage, allPokemons, paginado}) {
  const pageNumbers = [];

  //calculo cantidad de paginas y pusheo el resultado
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="paginado">
        {
            pageNumbers &&
          pageNumbers.map(number => { return (
            

              <a onClick={() => paginado(number)}>{number}</a>
            
          )})}
      </ul>
    </nav>
  );
}
