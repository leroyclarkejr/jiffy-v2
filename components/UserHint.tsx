import Image from "next/image";
import react from "react";

export const UserHint = (hintText: string) => {
  return (
    <div className="user-hint">
      {loading ? (
        <Image src={loaderIcon} alt="Loading icon" />
      ) : (
        <h2 aria-label="User Hint">{hintText}</h2>
      )}
    </div>
  );
};
