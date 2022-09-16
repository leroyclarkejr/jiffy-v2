import Image from "next/image";
import clearButton from "/public/images/close-icon.svg";

export interface HeaderProps {
  clearSearch: () => void;
  handleSearch: () => void;
  hasResults: boolean;
  validSearchPhrase: boolean;
}

export const Header = ({
  clearSearch,
  hasResults,
  validSearchPhrase,
  handleSearch,
}: HeaderProps) => {
  return (
    <header className="header">
      <div className="mx-auto text-center">
        {!validSearchPhrase && !hasResults && (
          <h1 className="title">Giphy API Search</h1>
        )}
        {validSearchPhrase && !hasResults && (
          <h1 onClick={handleSearch} className="title">
            Click here to start search
          </h1>
        )}

        {validSearchPhrase && hasResults && (
          <button onClick={clearSearch} aria-label="Clear Search">
            <Image src={clearButton} alt="Clear Search" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
