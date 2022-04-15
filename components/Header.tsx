import Image from "next/image";
import react, { useState } from "React";
import clearButton from "/public/images/close-icon";

export const Header = ({ clearSearch, hasResults }) => {
  return (
    <header>
      {hasResults ? (
        <button onClick={clearSearch} ariaLabel="Clear Search">
          <Image src={clearButton} alt="Clear Search" />
        </button>
      ) : (
        <h1 className="title">Giphy API Search</h1>
      )}
    </header>
  );
};

export default Header;
