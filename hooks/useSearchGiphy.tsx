import React from "react";

const randomChoice = (arr) => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

export async function useSearchGiphy(searchTerm: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [gifs, setGifs] = useState<array>([]);
  const [hintText, setHintText] = useState<string>("");
  const [hasResults, seHasResults] = useState<boolean>(false);

  try {
    setLoading(true);
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=v6NhNfqg3o1nQCcXRUBfBDfrxMcl9mv7&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`
    );

    const { data } = await response.json();

    if (!data.length) {
      throw `Nothing found for ${searchTerm}`;
    }
    const randomGif = randomChoice(data);

    setGifs(randomGif);
    setHintText(`Hit enter to see more ${searchTerm}`);
    setLoading(false);
  } catch (error) {
    setHintText(error);
    setLoading(false);
  }
}
export { loading, gifs, hintText, hasResults };
