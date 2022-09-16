import React, { useState, useRef } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { UserHint } from "../components/UserHint";
import { Gif, GifProps } from "../components/Gif";

const giphyApiKey = process.env.GIPHY_API;

export interface GifLink {
  images: {
    original: {
      mp4: string;
    };
  };
}

const randomChoice = (arr: []): GifLink => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [gifs, setGifs] = useState<string[]>([]);
  const [hintText, setHintText] = useState<string>("");
  const [hasResults, setHasResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [validSearchPhrase, setValidSearchPhrase] = useState(false);

  const giphySearch = async (searchTerm: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}=${searchTerm}&limit=25&offset=0&rating=G&lang=en`
      );

      const { data } = await response.json();

      if (!data.length) {
        throw `Nothing found for ${searchTerm}`;
      }
      const randomGif = randomChoice(data)?.images.original.mp4;

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
      setHintText("");
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
    setHasResults(false);
    setGifs([]);
  }

  return (
    <main className="page">
      <Header clearSearch={clearSearch} hasResults={hasResults} />
      <div className="search grid">
        {gifs.map((gif, i) => {
          return <Gif key={i} src={gif} />;
        })}

        <input
          className="input grid-item"
          type="text"
          placeholder="Type Something"
          onKeyPress={handleKeyPress}
          value={searchTerm}
          onChange={handleChange}
          aria-label="Search for Gifs"
        />
        <button aria-label="Submit search term">Search</button>
      </div>

      <UserHint loading={loading} hintText={hintText} />
    </main>
  );
};

export default Home;
