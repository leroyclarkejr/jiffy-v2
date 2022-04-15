import Image from "next/image";
import react from "React";
import clearButton from "/public/images/close-icon";

export const Header = ({ clearSearch, hasResults, onClick }) => {
  return (
    <header>
      {hasResults ? (
        <button onClick={onClick} ariaLabel="Clear Search">
          <Image src={clearButton} alt="Clear Search" />
        </button>
      ) : (
        <h1 className="title">Giphy API Search</h1>
      )}
    </header>
  );
};
