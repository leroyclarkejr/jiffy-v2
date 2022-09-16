import Image from "next/image";
import clearButton from "/public/images/close-icon.svg";

export interface HeaderProps {
  clearSearch: () => void;
  hasResults: boolean;
}

export const Header = ({ clearSearch, hasResults }: HeaderProps) => {
  return (
    <header className="header">
      <div className="mx-auto text-center">
        {hasResults ? (
          <button onClick={clearSearch} aria-label="Clear Search">
            <Image src={clearButton} alt="Clear Search" />
          </button>
        ) : (
          <h1 className="title">Giphy API Search</h1>
        )}
      </div>
    </header>
  );
};

export default Header;
