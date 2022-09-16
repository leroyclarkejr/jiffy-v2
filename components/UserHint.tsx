import Image from "next/image";
import loaderIcon from "../public/images/loader.svg";

export interface UserHintProps {
  hintText: string;
  loading: boolean;
}

export const UserHint = ({ hintText, loading }: UserHintProps) => {
  return (
    <div className="user-hint">
      {loading ? (
        <Image className="block mx-auto" src={loaderIcon} alt="Loading icon" />
      ) : (
        <h2 aria-label="User Hint">{hintText}</h2>
      )}
    </div>
  );
};
