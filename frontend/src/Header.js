import React from 'react';

// JSX (JavaScript + XML) = HTML que está dentro do JS
// Componente = função que retorna HTML

function Header({ children }) {
  return (
    <header>
        <h1>{children}</h1>
    </header>
  );
}

export default Header;