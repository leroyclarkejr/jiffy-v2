import React from "react";
import { useId } from "@reach/auto-id";

export default function Gif(props) {
  const [loaded, setLoaded] = useState<boolean>(false);

  const images = { ...props };

  const { id } = useId();
  return (
    <video
      autoPlay
      loop
      src={images.original.mp4}
      className={`grid-item video ${loaded && "loaded"}`}
      key={id}
      onLoadedData={() => setLoaded(true)}
    />
  );
}
