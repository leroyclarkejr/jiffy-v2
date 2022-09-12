import React, { useState, useRef } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { UserHint } from "../components/UserHint";
import { Gif } from "../components/Gif";

import { useSearchGiphy } from "../hooks/useSearchGiphy";

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [gifs, setGifs] = useState<array>([]);
  const [hintText, setHintText] = useState<string>("");
  const [hasResults, seHasResults] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  let inputRef = useRef(null);

  const giphySearch = async (searchTerm: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=v6NhNfqg3o1nQCcXRUBfBDfrxMcl9mv7&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`
      );

      const { data } = await response.json();
      console.log(data);

      if (!data.length) {
        throw `Nothing found for ${searchTerm}`;
      }
      const randomGif = randomChoice(data);
      console.log(data);
      console.log(randomGif);

      setGifs([...gifs, randomGif]);
      setHintText(`Hit enter to see more ${searchTerm}`);
      setHasResults(true);
      setLoading(false);
    } catch (error) {
      setHintText(error);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    if (value.length > 2) {
      setHintText(`Hit enter to search ${value}`);
    }
  };

  function handleKeyPress(event) {
    const { value } = event.target;
    if (value.length > 2 && event.key === "Enter") {
      giphySearch(value);
    }
  }

  function clearSearch() {
    setSearchTerm("");
    setHintText("");
    setGifs([]);
  }

  return (
    <main className="page">
      <Header clearSearch={clearSearch} hasResults={hasResults} />

      <div className="search grid">
        {gifs.map((gif) => (
          // eslint-disable-next-line react/jsx-key
          <Gif {...gifs} />
        ))}
        <input
          className="input grid-item"
          type="text"
          placeholder="Type Something"
          onKeyPress={handleKeyPress}
          value={searchTerm}
          onChange={handleChange}
          ref={(input) => (inputRef = input)}
          aria-label="Search for Gifs"
        />
        <button>Search</button>
      </div>

      {/* <UserHint loading={loading} hintText={hintText} /> */}
    </main>
  );
};

export default Home;
