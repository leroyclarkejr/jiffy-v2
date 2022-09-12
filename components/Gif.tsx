import { useState } from "react";
import { useId } from "@reach/auto-id";

export interface GifProps {
  images?: { original?: { mp4: string } };
}

export function Gif(props: GifProps) {
  const [loaded, setLoaded] = useState<boolean>(false);

  const { images } = props;

  const id = useId();
  return (
    <video
      autoPlay
      loop
      src={images?.original?.mp4}
      className={`grid-item video ${loaded && "loaded"}`}
      key={id}
      onLoadedData={() => setLoaded(true)}
    />
  );
}
