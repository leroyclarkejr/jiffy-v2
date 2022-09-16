import React, { useState, useRef } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { UserHint } from "../components/UserHint";
import { Gif } from "../components/Gif";

const giphyApiKey = process.env.GIPHY_API_KEY;

const randomChoice = (arr: []) => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [gifs, setGifs] = useState([]);
  const [hintText, setHintText] = useState<string>("");
  const [hasResults, setHasResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [validSearchPhrase, setValidSearchPhrase] = useState(false);

  let inputRef = useRef(null);

  const giphySearch = async (searchTerm: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}=${searchTerm}&limit=25&offset=0&rating=G&lang=en`
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
      setHintText(searchTerm);
      setLoading(false);
    }
  };

  const handleChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (value.length > 2) {
      setHintText(`Hit enter to search ${value}`);
      setValidSearchPhrase(true);
    } else {
      setHintText(null);
      setValidSearchPhrase(false);
    }
  };

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (validSearchPhrase && e.key === "Enter") {
      giphySearch(searchTerm);
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
          <Gif images={[...gifs]} />
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
        <button aria-label="Submit search term">Search</button>
      </div>

      <UserHint loading={loading} hintText={hintText} />
    </main>
  );
};

export default Home;
