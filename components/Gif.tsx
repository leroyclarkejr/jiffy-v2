import { useState } from "react";
import { useId } from "@reach/auto-id";

export interface GifProps {
  src: string;
}

export function Gif(props: GifProps) {
  const [loaded, setLoaded] = useState<boolean>(false);

  const { src } = props;

  const id = useId();
  return (
    <video
      autoPlay
      loop
      src={src}
      className={`grid-item video ${loaded && "loaded"}`}
      key={id}
      onLoadedData={() => setLoaded(true)}
    />
  );
}
